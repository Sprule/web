import { FormBuilder, Validators } from '@angular/forms/';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
    categoryLoading: boolean;
    category;

    createFormGroup;

    title;

    private sub;

    constructor(
        public route: ActivatedRoute,
        public apollo: Apollo,
        public formBuilder: FormBuilder
    ) {
        this.createFormGroup = this.formBuilder.group({
            titleCtrl: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]]
        })
    }

    async submit(title, content) {
        let result = await this.apollo.mutate({
            mutation: gql`
                mutation createTopic($title: String!, $content: String!, $category: ID!) {
                    createTopic(title: $title, content: $content, category: $category)
                }
            `,
            variables: {
                title: title,
                content: content,
                category: this.category._id
            }
        }).toPromise() as any;
    }

    ngOnInit() {
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
        })
    }

}
