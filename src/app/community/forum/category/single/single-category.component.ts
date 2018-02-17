import { MatSnackBar } from '@angular/material';
import { CommunityService } from './../../../../services/community.service';
import { Apollo } from 'apollo-angular/Apollo';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { CategoryComponent } from '../category.component';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';

@Component({
    selector: 'app-forum-single-category',
    templateUrl: '../category.component.html',
    styleUrls: ['../category.component.scss']
})
export class SingleCategoryComponent extends CategoryComponent implements OnInit {
    @Input() category;

    categoryLoading: boolean = false;
    
    private sub;

    constructor(
        apollo: Apollo,
        community: CommunityService,
        snackbar: MatSnackBar,
        private route: ActivatedRoute
    ) {
        super(
            apollo,
            community,
            snackbar
        );
    }

    ngOnInit() {
        super.ngOnInit();

        this.categoryLoading = true;
        this.sub = this.route.params.subscribe(async params => {
            let id = params['category'];

            let result = await this.apollo.query({
                query: gql`
                    query category($category: ID!) {
                        category(category: $category) {
                            _id
                            name
                            desc
                        }
                    }
                `,
                variables: {
                    category: id
                }
            }).toPromise() as any;
            console.log('category: ' + result.data.category);

            this.category = result.data.category;
            this.categoryLoading = false;

            super.loadTopics();
        })
    }
    
    async getTopicListings(offset: number, limit: number) {
        let result = await this.apollo.query({
            query: gql`
                query topicListing($community: ID!, $offset: Int, $limit: Int, $category: ID!) {
                    topicListing(community: $community, offset: $offset, limit: $limit, category: $category) {
                        _id
                        community
                        title
                        replyCount
                        locked
                        user {
                            _id
                            name
                        }
                        post {
                            user {
                                _id
                                name
                            }
                        }
                        replies(lastOnly: true) {
                            _id
                            user {
                                _id
                                name
                            }
                        }
                        replyCount
                        views
                    }
                }
            `,
            variables: {
                community: this.community.community._id,
                offset: offset,
                limit: limit,
                category: this.category._id
            },
            fetchPolicy: 'network-only'
        }).toPromise() as any;
        console.log(result.data);
        return result.data.topicListing;
    }

    async getTopicName() {
        
    }

    async getTopicDesc() {

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
