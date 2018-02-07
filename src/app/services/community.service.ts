import { AuthService } from './auth.service';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Inject, Injector, PLATFORM_ID } from '@angular/core';
import { Apollo } from 'apollo-angular/Apollo';

@Injectable()
export class CommunityService {
    /**
     * Community metadata
     */
    public community;

    /**
     * User assigned roles. Contains permission nodes.
     */
    public roles;

    public initialized: boolean = false;

    constructor(
        public apollo: Apollo,
        public auth: AuthService
    ) { 
        
    }

    public async initCommunity(force: boolean = false) {
        if (this.initialized && !force) return true;

        let hostname = window.location.hostname;
        console.log('hostname: ' + hostname);

        let subdomain;
        if (hostname == 'localhost') {
            subdomain = 'test';
        } else {
            subdomain = hostname.split('.')[0];
        }
        console.log('subdomain: ' + subdomain);

        try {
            let result: any = await this.apollo.query({
                query: gql`
                    query community($subdomain: String!) {
                        community(subdomain: $subdomain) {
                            _id,
                            name
                        }
                    }
                `,
                variables: {
                    subdomain: subdomain
                }
            }).toPromise();

            console.log('community result: ' + JSON.stringify(result));
            this.community = (result.data as any).community;
        } catch (error) {
            console.log('Unable to find community. Error: ' + error);
            return false;
        }     

        try {
            let result = await this.apollo.query({
                query: gql`
                        query userRoles($community: ID!) {
                            userRoles(community: $community) {
                                _id
                                tagVisible
                                tagName
                                tagBackgroundColor
                                tagTextColor
                                permissions
                            }
                        }
                    `,
                variables: {
                    community: this.community._id
                }
            }).toPromise();
            console.log('user roles result: ' + JSON.stringify(result));
            this.roles = (result.data as any).userRoles;
        } catch (error) {
            console.log(error);
            return false;
        }

        this.initialized = true;
        return true;
    }
    
    public hasPermission(node: string): boolean {
        for (let role of this.roles) {
            if (role.permissions.indexOf(node) > -1 || node === '*') {
                return true;
            }
        }
        return false;
    }
}
