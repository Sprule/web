import { ForumService } from './../../../services/forum.service';
import { FormBuilder, Validators } from '@angular/forms/';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-reply-topic',
  templateUrl: './reply-topic.component.html',
  styleUrls: ['./reply-topic.component.scss']
})
export class ReplyTopicComponent implements OnInit {
    topicLoading: boolean;
    topic;

    createFormGroup;

    title;

    private sub;

    constructor(
        public route: ActivatedRoute,
        public apollo: Apollo,
        public formBuilder: FormBuilder,
        public forum: ForumService
    ) {
        this.createFormGroup = this.formBuilder.group({})
    }

    async submit(content) {
        let result = await this.apollo.mutate({
            mutation: gql`
                mutation createPost($content: String!, $topic: ID!) {
                    createPost(content: $content, topic: $topic)
                }
            `,
            variables: {
                content: content,
                topic: this.topic._id
            }
        }).toPromise() as any;
    }

    ngOnInit() {
        this.topicLoading = true;
        this.sub = this.route.params.subscribe(async params => {
            let id = params['topic'];

            let result = await this.apollo.query({
                query: gql`
                    query topic($id: ID!) {
                        topic(id: $id) {
                            _id
                            category {
                                _id
                                name
                            }
                        }
                    }
                `,
                variables: {
                    id: id
                }
            }).toPromise() as any;
            console.log('topic: ' + JSON.stringify(result.data.topic));

            this.forum.selectedCategory = result.data.topic.category;

            this.topic = result.data.topic;
            this.topicLoading = false;
        })
    }

}
