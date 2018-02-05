import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Inject, Injector, PLATFORM_ID } from '@angular/core';
import { Apollo } from 'apollo-angular/Apollo';

@Injectable()
export class CommunityService {
    public community;

    constructor(
        public apollo: Apollo
    ) { 
        
    }

    public async initCommunity() {
        let hostname = window.location.hostname;
        console.log('hostname: ' + hostname);

        let subdomain;
        if (hostname == 'localhost') {
            subdomain = 'dev';
        } else {
            subdomain = hostname.split('.')[0];
        }
        console.log('subdomain: ' + subdomain);

        try {
            let result = await this.apollo.query({
                query: gql`
                query community($subdomain: String!) {
                    community(subdomain: $subdomain) {
                        _id
                    }
                }
            `,
                variables: {
                    subdomain: subdomain
                }
            }).toPromise();
            this.community = (result.data as any).community;
            return true;
        } catch (error) {
            console.log('Unable to find community. Error: ' + error);
            return false;
        }     
    }
    

}
