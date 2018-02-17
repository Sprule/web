import { ActivatedRoute } from '@angular/router';
import { CommunityService } from './../../../services/community.service';
import { Apollo } from 'apollo-angular';
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import gql from 'graphql-tag';

@Component({
    selector: 'app-forum-topic',
    templateUrl: "./topic.component.html",
    styleUrls: ["./topic.component.scss"]
})
export class TopicComponent implements OnInit {
    topic;
    topicLoading;

    replies;
    repliesLoading;

    sub;

    constructor(
        public apollo: Apollo,
        public community: CommunityService,
        public snackbar: MatSnackBar,
        public route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(async params => {
            this.topicLoading = true;
            let id = params['topic'];

            let result = await this.apollo.query({
                query: gql`
                    query topic($id: ID!) {
                        topic(id: $id) {
                            _id
                            title
                            post {
                                _id
                                content
                                edits
                                likeCount
                            }
                            locked
                            category {
                                _id
                            }
                        }
                    }
                `,
                variables: {
                    id: id
                }
            }).toPromise() as any;
            console.log('topic: ' + result.data.topic);
            this.topic = result.data.topic;
            this.topicLoading = false;

            this.loadReplies(0, 20);
        });
    }

    async loadReplies(offset, amount) {
        this.repliesLoading = true;
        let result = await this.apollo.query({
            query: gql`
                    query topic($id: ID!, $offset: Int, $amount: Int) {
                        topic(id: $id) {
                            _id
                            replies(offset: $offset, amount: $amount) {
                                _id
                                user {
                                    _id
                                    name
                                }
                                content
                                edits
                                likeCount
                            }
                        }
                    }
                `,
            variables: {
                id: this.topic._id,
                offset: offset,
                amount: amount
            },
            fetchPolicy: 'network-only'
        }).toPromise() as any;
        console.log('replies: ' + JSON.stringify(result.data.topic.replies));
        this.replies = result.data.topic.replies;
        this.repliesLoading = false;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
