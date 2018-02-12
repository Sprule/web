import { HeaderComponent } from './../header/header.component';
import { AdminRolesComponent } from './roles/roles.component';
import { AdminSidebarComponent } from './sidebar/sidebar.component';
import { CommunityAdminGuard } from './../../guards/community-admin.guard';
import { AdminHomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router';
import { CommunityGuard } from '../../guards/community.guard';
import { MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule, MatDialogModule, MatSlideToggleModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../navbar/navbar.module';
import { AdminCategoriesComponent } from './categories/categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../global/dialog/confirm/confirm.component';

@NgModule({
    declarations: [
        AdminHomeComponent, AdminSidebarComponent, AdminCategoriesComponent,
        HeaderComponent, ConfirmDialogComponent, AdminRolesComponent
    ],
    imports: [
        CommonModule,
        NavbarModule,
        RouterModule.forChild([
            {
                path: '', component: AdminSidebarComponent, children: [
                    { path: '', component: AdminHomeComponent },
                    { path: 'categories', component: AdminCategoriesComponent },
                    { path: 'roles', component: AdminRolesComponent }
                ]
            }
        ]),
        MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule,
        ReactiveFormsModule, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule, MatDialogModule,
        MatSlideToggleModule,
        FlexLayoutModule
    ],
    entryComponents: [ConfirmDialogComponent]
})
export class AdminModule {

}