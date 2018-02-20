import { Apollo } from 'apollo-angular';
import { FormGroup } from '@angular/forms/src/model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import gql from 'graphql-tag';
import { CommunityService } from '../../../services/community.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class AdminUsersComponent implements OnInit {
    searchFormGroup;
    searchFormControl;

    results;

    constructor(
        formBuilder: FormBuilder,
        public apollo: Apollo,
        public community: CommunityService
    ) {
        this.searchFormGroup = formBuilder.group({});
        this.searchFormControl = new FormControl();
    }

    ngOnInit() {
    }

    async searchUser(name) {
        let result = await this.apollo.query({
            query: gql`
                query searchUser($name: String!, $community: ID!) {
                    searchUser(name: $name, community: $community) {
                        _id
                        name
                        avatar
                    }
                }
            `,
            variables: {
                name: name,
                community: this.community.community._id
            }
        }).toPromise() as any;
        console.log(result.data.searchUser);
        this.results = result.data.searchUser;
    }

}
