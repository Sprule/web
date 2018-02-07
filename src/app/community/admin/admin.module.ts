import { CommunityAdminGuard } from './../../guards/community-admin.guard';
import { AdminHomeComponent } from './home/home.component';
import { NavbarComponent } from '../layouts/navbar/navbar.component';
import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router';
import { CommunityGuard } from '../../guards/community.guard';
import { MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: NavbarComponent, canActivate: [CommunityAdminGuard], children: [
                    { path: '', component: AdminHomeComponent, pathMatch: 'full' }
                ]
            }
        ]),
        MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule,
        FlexLayoutModule
    ]
})
export class AdminModule {

}