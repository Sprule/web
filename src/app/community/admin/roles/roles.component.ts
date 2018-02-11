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
    selector: 'app-admin-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss']
})
export class AdminRolesComponent implements OnInit {
    loadingRoles;
    roles;

    selectedRole;
    editLoading = false;
    editFormGroup: FormGroup;

    creatingNewRole = false;
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
            nameCtrl: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
            tagNameCtrl: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
            tagBackgroundColorCtrl: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
            tagTextColorCtrl: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
        })
    }

    ngOnInit() {
        this.loadRoles();
    }

    async loadRoles() {
        this.loadingRoles = true;
        let result: any = await this.apollo.query({
            query: gql`
                query roles($community: ID!) {
                    roles(community: $community) {
                        _id
                        name
                        tagVisible
                        tagName
                        tagBackgroundColor
                        tagTextColor
                        permissions
                    }
                }
            `,
            variables: {
                community: this.community.community._id
            },
            fetchPolicy: 'network-only'
        }).toPromise();

        this.roles = result.data.roles;
        this.loadingRoles = false;
        console.log(this.roles);

        // Autoselect the first role.
        if (this.roles.length > 0) {
            this.selectedRole = this.roles[0];
        }
    }

    selectRole(role) {
        this.selectedRole = role;
        this.creatingNewRole = false;
    }

    selectNewRole() {
        this.selectedRole = null;
        this.creatingNewRole = true;
    }

    async createRole(name) {
        this.createLoading = true;
        try {
            await this.apollo.mutate({
                mutation: gql`
                    mutation createRole($name: String!, $community: ID!) {
                        createRole(name: $name, community: $community)
                    }
                `,
                variables: {
                    name: name,
                    community: this.community.community._id
                }
            }).toPromise();

            await this.loadRoles();
            this.creatingNewRole = false;
        } catch (error) {
            console.log(error);
            this.snackbar.open(error.message, 'close', {
                duration: 7000
            })
        }
        this.createLoading = false;
    }

    async editRole(
        role,
        name,
        tagVisible,
        tagName,
        tagBackgroundColor,
        tagTextColor,
        permissions
    ) {
        this.editLoading = true;
        try {
            await this.apollo.mutate({
                mutation: gql`
                    mutation editRole(
                        $role: ID!, 
                        $name: String!,
                        $tagVisible: Boolean!,
                        $tagName: String!,
                        $tagBackgroundColor: String!,
                        $tagTextColor: String!,
                        $permissions: [String]!
                    ) {
                        editRole(
                            role: $role, 
                            name: $name, 
                            tagVisible: $tagVisible, 
                            tagName: $tagName, 
                            tagBackgroundColor: $tagBackgroundColor,
                            tagTextColor: $tagTextColor, 
                            permissions: $permissions
                        )
                    }
                `,
                variables: {
                    role: role._id,
                    name: name,
                    tagVisible: tagVisible,
                    tagName: tagName,
                    tagBackgroundColor: tagBackgroundColor,
                    tagTextColor: tagTextColor,
                    permissions: permissions
                }
            }).toPromise();

            await this.loadRoles();
        } catch (error) {
            console.log(error);
            this.snackbar.open(error.message, 'close', {
                duration: 7000
            })
        }
        this.editLoading = false;
    }

    async deleteRole(role) {
        let result = await this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                header: 'Delete Role',
                message: 'Are you sure you want to delete ' + role.name + '? This cannot be undone.'
            }
        }).afterClosed().toPromise();

        if (result) {
            await this.apollo.mutate({
                mutation: gql`
                    mutation deleteRole($role: ID!) {
                        deleteRole(role: $role)
                    }
                `,
                variables: {
                    role: role._id
                }
            }).toPromise();

            await this.loadRoles();
        }
    }

}
