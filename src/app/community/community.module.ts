import { NavbarComponent } from './layouts/navbar/navbar.component';
import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { CommunityGuard } from '../guards/community.guard';
import { MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [HomeComponent, NavbarComponent],
    imports: [
        RouterModule.forChild([
            {
                path: '', component: NavbarComponent, canActivate: [CommunityGuard], children: [
                    { path: '', component: HomeComponent, pathMatch: 'full' }
                ]
            }
        ]),
        MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule,
        FlexLayoutModule
    ]
})
export class CommunityModule {

}