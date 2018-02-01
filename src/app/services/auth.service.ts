import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular/Apollo';
import gql from 'graphql-tag';

@Injectable()
export class AuthService {
    public token;

    constructor(
        public apollo: Apollo
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
        return this.token !== null;
    }    
}
