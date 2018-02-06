import { Injectable, Inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular/Apollo';
import gql from 'graphql-tag';
import { PLATFORM_ID } from '@angular/core/src/application_tokens';
import { isPlatformBrowser } from '@angular/common/src/platform_id';
import { PlatformService } from './platform.service';

@Injectable()
export class AuthService {
    authed: boolean = false;

    constructor(
        public apollo: Apollo,
        public platform: PlatformService
    ) { 
        
    }

    public async login(email: string, password: string) {

        try {
            let result = await this.apollo.mutate({
                mutation: gql`
                mutation login($email: String!, $password: String!) {
                    login(email: $email, password: $password)
                }
            `,
                variables: {
                    email: email,
                    password: password
                }
            }).toPromise();

            console.log('Got login data: ' + result);
            this.authed = true;
            this.setToken(result.data.login);
        } catch (err) {
            console.log('Login error: ' + err);
            this.authed = false;
            this.removeToken();

            throw 'Invalid email & password.'
        }
    }

    public async ghostLogin(): Promise<boolean> {
        if (this.platform.isBrowser() && this.getToken()) {
            try {
                let result = await this.apollo.mutate({
                    mutation: gql`
                    mutation ghostLogin($token: String!) {
                        ghostLogin(token: $token)
                    }
                `,
                    variables: {
                        token: this.getToken()
                    }
                }).toPromise();

                if (result) {
                    console.log('successful ghost login.');
                }
                this.authed = result;
                return true;
            } catch (err) {
                this.authed = false;
                return false;
            }
        } else {
            this.authed = false;
            return false;
        }
    }

    public async register(name: string, email: string, password: string) {
        try {
            console.log(name, email, password);
            let result = await this.apollo.mutate({
                mutation: gql`
                mutation register($name: String!, $email: String!, $password: String!) {
                    register(name: $name, email: $email, password: $password)
                }
            `,
                variables: {
                    name: name,
                    email: email,
                    password: password
                }
            }).toPromise();

            console.log('register data: ' + result.data.register);
            this.authed = true;
            this.setToken(result.data.register);

            return true;
        } catch (err) {
            console.log(err);
            if (err.networkError) {
                throw 'Connection failed. Please try again';
            } else {
                throw err.message.split('GraphQL error: ')[1];
            }
        }
    }

    public isAuthed(): boolean {
        return this.authed;
    }
    
    public getToken(): string {
        if (this.platform.isBrowser()) {
            return localStorage.getItem('token');
        } else {
            return null;
        }
    }

    public setToken(token: string) {
        if (this.platform.isBrowser()) {
            localStorage.setItem('token', 'Bearer ' + token);
        }
    }

    public removeToken() {
        if (this.platform.isBrowser()) {
            localStorage.removeItem('token');
        }
    }
}
