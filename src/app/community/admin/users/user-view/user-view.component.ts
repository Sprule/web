import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { CommunityService } from '../../../../services/community.service';

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.scss']
})
export class AdminUserViewComponent implements OnInit {
    sub;

    errorMessage;

    loadingUser;
    user;

    constructor(
        public route: ActivatedRoute,
        public apollo: Apollo,
        public community: CommunityService
    ) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(async params => {
            let name = params['user'];   
            this.loadUser(name);
        });
    }

    async loadUser(name) {
        this.errorMessage = null;
        this.loadingUser = true;
        try {
            let result = await this.apollo.query({
                query: gql`
                        query user($name: String, $community: ID!) {
                            user(name: $name) {
                                _id
                                name
                                avatar
                                roles(community: $community) {
                                    _id
                                    tagVisible
                                    tagName
                                    tagBackgroundColor
                                    tagTextColor
                                    permissions
                                }
                            }
                        }
                    `,
                variables: {
                    name: name,
                    community: this.community.community._id
                }
            }).toPromise() as any;
            this.user = result.data.user;
        } catch (error) {
            console.log(error);
            this.errorMessage = 'Unable to find user.';
        }   

        this.loadingUser = false;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
