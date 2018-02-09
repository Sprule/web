import { ConfirmDialogComponent } from './../../../global/dialog/confirm/confirm.component';
import { CommunityService } from './../../../services/community.service';
import { Apollo } from 'apollo-angular/Apollo';
import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms/';
import { Validators } from '@angular/forms/';
import { ChangeDetectorRef } from '@angular/core/';

@Component({
    selector: 'app-admin-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
    loadingCategories;
    categories;

    selectedCategory;
    editLoading = false;
    editFormGroup: FormGroup;

    creatingNewCategory = false;
    createLoading = false;
    createFormGroup: FormGroup;

    constructor(
        public apollo: Apollo,
        public community: CommunityService,
        public snackbar: MatSnackBar,
        public formBuilder: FormBuilder,
        public changeDetectorRef: ChangeDetectorRef,
        public dialog: MatDialog
    ) {
        this.createFormGroup = this.formBuilder.group({
            nameCtrl: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]]
        })

        this.editFormGroup = this.formBuilder.group({
            nameCtrl: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]]
        })
    }

    ngOnInit() {
        this.loadCategories();
    }

    async loadCategories() {
        this.loadingCategories = true;
        let result: any = await this.apollo.query({
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
            },
            fetchPolicy: 'network-only'
        }).toPromise();

        this.categories = result.data.categories;
        this.loadingCategories = false;
        console.log(this.categories);

        // Autoselect the first category.
        if (this.categories.length > 0) {
            this.selectedCategory = this.categories[0];
        }
    }

    selectCategory(category) {
        this.selectedCategory = category;
        this.creatingNewCategory = false;
    }

    selectNewCategory() {
        this.selectedCategory = null;
        this.creatingNewCategory = true;
    }

    async createCategory(name) {
        this.createLoading = true;
        try {
            await this.apollo.mutate({
                mutation: gql`
                    mutation createCategory($name: String!, $community: ID!) {
                        createCategory(name: $name, community: $community)
                    }
                `,
                variables: {
                    name: name,
                    community: this.community.community._id
                }
            }).toPromise();

            await this.loadCategories();
        } catch (error) {
            console.log(error);
            this.snackbar.open(error.message, 'close', {
                duration: 7000
            })
        }
        this.createLoading = false;
    }

    async editCategory(category, name) {
        this.editLoading = true;
        try {
            await this.apollo.mutate({
                mutation: gql`
                    mutation editCategory($category: ID!, $name: String!) {
                        editCategory(category: $category, name: $name)
                    }
                `,
                variables: {
                    category: category._id,
                    name: name
                }
            }).toPromise();

            await this.loadCategories();
        } catch (error) {
            console.log(error);
            this.snackbar.open(error.message, 'close', {
                duration: 7000
            })
        }
        this.editLoading = false;
    }

    async deleteCategory(category) {
        let result = await this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                header: 'Delete Category',
                message: 'Are you sure you want to delete ' + category.name + '? This cannot be undone.'
            }
        }).afterClosed().toPromise();

        if (result) {
            await this.apollo.mutate({
                mutation: gql`
                    mutation deleteCategory($category: ID!) {
                        deleteCategory(category: $category)
                    }
                `,
                variables: {
                    category: category._id
                }
            }).toPromise();

            await this.loadCategories();
        }
    }

}
