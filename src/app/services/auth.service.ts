import { Injectable, Inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular/Apollo';
import gql from 'graphql-tag';
import { PLATFORM_ID } from '@angular/core/src/application_tokens';
import { isPlatformBrowser } from '@angular/common/src/platform_id';
import { PlatformService } from './platform.service';

@Injectable()
export class AuthService {

    constructor(
        public apollo: Apollo,
        public platform: PlatformService
    ) { 
        
    }

    public async login(email: string, password: string) {

        try {
            let data = await this.apollo.mutate({
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

            console.log('got data', data);
            this.setToken(data.login);
        } catch (err) {
            console.log('there was an error sending the query', err);
            this.removeToken();

            throw 'Invalid email & password.'
        }
    }

    public async ghostLogin(): Promise<boolean> {
        if (this.platform.isBrowser() && this.getToken()) {
            this.apollo.mutate({
                mutation: gql`
                    mutation ghostLogin($token: String!) {
                        ghostLogin(token: $token)
                    }
                `,
                variables: {
                    token: this.getToken()
                }
            }).subscribe(({ data }) => {
                return true;
            }, err => {
                return false;
            })
        } else {
            return false;
        }
    }

    public async register(name: string, email: string, password: string) {
        this.apollo.mutate({
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
        }).subscribe(({ data }) => {
            
        }, err => {
            
        })
    }

    public isAuthed(): boolean {
        return this.getToken() != null;
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
            localStorage.setItem('token', token);
        }
    }

    public removeToken() {
        if (this.platform.isBrowser()) {
            localStorage.removeItem('token');
        }
    }
}
