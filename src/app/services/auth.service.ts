import { Injectable, Inject } from '@angular/core';
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
        this.login('test', 'test');
    }

    public async login(email: string, password: string) {
        this.apollo.mutate({
            mutation: gql`
                mutation login($email: String!, $password: String!) {
                    login(email: $email, password: $password)
                }
            `,
            variables: {
                email: email,
                password: password
            }
        }).subscribe(({ data }) => {
            console.log('got data', data);
        }, (error) => {
            console.log('there was an error sending the query', error);
        });
    }

    public ghostLogin() {
        
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
}
