import { CommunityAdminGuard } from './../../guards/community-admin.guard';
import { AdminHomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router';
import { CommunityGuard } from '../../guards/community.guard';
import { MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../navbar/navbar.module';

@NgModule({
    declarations: [AdminHomeComponent],
    imports: [
        CommonModule,
        NavbarModule,
        RouterModule.forChild([
            { path: '', component: AdminHomeComponent }
        ]),
        MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule,
        FlexLayoutModule
    ]
})
export class AdminModule {

}