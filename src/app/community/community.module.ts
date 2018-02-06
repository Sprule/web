import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { CommunityGuard } from '../guards/community.guard';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        RouterModule.forChild([
            { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [CommunityGuard] }
        ])
    ]
})
export class CommunityModule {

}