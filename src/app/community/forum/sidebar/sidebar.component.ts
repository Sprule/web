import { CommunityService } from './../../../services/community.service';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    loading: boolean = true;
    categories: [any];

    constructor(
        public apollo: Apollo,
        public community: CommunityService
    ) { }

    ngOnInit() {
        this.apollo.watchQuery({
            query: gql`
                query categories($community: ID!) {
                    categories(community: $community) {
                        _id
                        name
                    }
                }
            `,
            variables: {
                community: this.community.community._id
            }
        }).valueChanges.subscribe(({ data }) => {
            console.log(data);

            this.loading = (data as any).loading;
            this.categories = (data as any).categories;
        }, err => {
            console.log(err);
        })
    }

}
