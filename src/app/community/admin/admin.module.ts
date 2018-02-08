import { AdminSidebarComponent } from './sidebar/sidebar.component';
import { CommunityAdminGuard } from './../../guards/community-admin.guard';
import { AdminHomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router';
import { CommunityGuard } from '../../guards/community.guard';
import { MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../navbar/navbar.module';
import { AdminCategoriesComponent } from './categories/categories.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AdminHomeComponent, AdminSidebarComponent, AdminCategoriesComponent],
    imports: [
        CommonModule,
        NavbarModule,
        RouterModule.forChild([
            {
                path: '', component: AdminSidebarComponent, children: [
                    { path: '', component: AdminHomeComponent },
                    { path: 'categories', component: AdminCategoriesComponent }
                ]
            }
        ]),
        MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule,
        ReactiveFormsModule, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule,
        FlexLayoutModule
    ]
})
export class AdminModule {

}