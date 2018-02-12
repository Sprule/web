import { MatSnackBar } from '@angular/material';
import { Apollo } from 'apollo-angular/Apollo';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { CategoryComponent } from '../category.component';
import gql from 'graphql-tag'
import { CommunityService } from '../../../../services/community.service';

@Component({
    selector: 'app-forum-recent-category',
    templateUrl: '../category.component.html',
    styleUrls: ['../category.component.scss']
})
export class RecentCategoryComponent extends CategoryComponent implements OnInit {
    recent: boolean = true;

    constructor(
        apollo: Apollo,
        community: CommunityService,
        snackbar: MatSnackBar
    ) {
        super(
            apollo,
            community,
            snackbar
        );
    }

    ngOnInit() {
        super.ngOnInit();

        super.loadTopics();
    }

    async getTopicListings(offset: number, limit: number) {
        let result = await this.apollo.query({
            query: gql`
                query topicListing($community: ID!, $offset: Int, $limit: Int) {
                    topicListing(community: $community, offset: $offset, limit: $limit) {
                        _id
                        community
                        title
                        replyCount
                        locked
                    }
                }
            `,
            variables: {
                community: this.community.community._id,
                offset: offset,
                limit: limit
            }
        }).toPromise() as any;
        console.log(result.data);
        return result.data.topicListing;
    }

    async getTopicName() {
        return "What's New?"
    }

    async getTopicDesc() {
        return "The latest discussion."
    }

}
