import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from './../../../services/community.service';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    loading: boolean = true;
    categories: [any];
    sub;
    url;

    constructor(
        public apollo: Apollo,
        public community: CommunityService,
        public route: ActivatedRoute,
        public router: Router,
        public location: Location
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
        
        // Hack for tracking activated category
        this.url = this.location.path();
        this.sub = this.router.events.subscribe(val => {
            this.url = this.location.path();
        })
    }

    isCategoryActive(category) {
        // What's New?
        if (!category && this.url == '/forums') return true; 

        return category && this.url.indexOf(category._id) > -1;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
