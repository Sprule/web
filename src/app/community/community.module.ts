import { NavbarComponent } from './layouts/navbar/navbar.component';
import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { CommunityGuard } from '../guards/community.guard';
import { MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopicIndexComponent } from './forum/topic-index/topic-index.component';
import { SidebarComponent } from './forum/sidebar/sidebar.component';
import { PostComponent } from './forum/post/post.component';
import { TopicComponent } from './forum/topic/topic.component';
import { CategoryComponent } from './forum/category/category.component';

@NgModule({
    declarations: [HomeComponent, NavbarComponent, TopicIndexComponent, SidebarComponent, PostComponent, TopicComponent, CategoryComponent],
    imports: [
        RouterModule.forChild([
            {
                path: '', component: NavbarComponent, canActivate: [CommunityGuard], children: [
                    { path: '', component: HomeComponent, pathMatch: 'full' },
                    {
                        path: 'forums', component: SidebarComponent, children: [
                            { path: '', component: TopicIndexComponent, pathMatch: 'full' }
                    ]}
                ]
            }
        ]),
        MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule,
        FlexLayoutModule
    ]
})
export class CommunityModule {

}