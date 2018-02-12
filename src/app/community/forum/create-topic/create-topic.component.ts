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

    private sub;

    constructor(
        public route: ActivatedRoute,
        public apollo: Apollo
    ) {

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
                        }
                    }
                `,
                variables: {
                    category: id
                }
            }).toPromise() as any;

            this.category = result.data.category;
            this.categoryLoading = false;
        })
    }

}
