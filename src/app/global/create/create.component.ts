import { FormBuilder } from '@angular/forms/';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core'
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular/Apollo';
import { MatSnackBar } from '@angular/material';
import gql from 'graphql-tag';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {
    loading: boolean = false;
    formGroup: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public apollo: Apollo,
        public snackar: MatSnackBar
    ) {
        this.formGroup = this.formBuilder.group({
            nameCtrl: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
            subdomainCtrl: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]]
        });
    }

    async create(name: string, subdomain: string) {
        try {
            let result = await this.apollo.mutate({
                mutation: gql`
                    mutation createCommunity($name: String!, $subdomain: String!) {
                        createCommunity(name: $name, subdomain: $subdomain)
                    }
                `,
                variables: {
                    name: name,
                    subdomain: subdomain
                }
            }).toPromise();

            let createdSubdomain = result.data.createCommunity;

            // Route to the community            
            window.location.href = 'https://' + createdSubdomain + '.forums.gg';
        } catch (error) {
            console.log(error);
            this.snackar.open(error, 'close', {
                duration: 10000
            });
        }
    }

    ngOnInit() {
      
    }

}
