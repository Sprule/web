import { FormBuilder, Validators } from '@angular/forms/';
import { Apollo } from 'apollo-angular/Apollo';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    category;
    categoryLoading;
    sub;

    createFormGroup;

    content;

    config = {
        heightMin: 400
    }

    constructor(
        public route: ActivatedRoute,
        public apollo: Apollo,
        public formBuilder: FormBuilder
    ) {
        this.createFormGroup = this.formBuilder.group({
            titleCtrl: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]]
        })
    }

    async submit(title) {
        let result = await this.apollo.mutate({
            mutation: gql`
                mutation createTopic($title: String!, $content: String!, $category: ID!) {
                    createTopic(title: $title, content: $content, category: $category)
                }
            `,
            variables: {
                title: title,
                content: this.content,
                category: this.category._id
            }
        }).toPromise() as any;

        console.log(result.data);
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
