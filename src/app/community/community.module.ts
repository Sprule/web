import { RecentCategoryComponent } from './forum/category/recent/recent-category.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { AdminHomeComponent } from './admin/home/home.component';
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
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../navbar/navbar.module';
import { SingleCategoryComponent } from './forum/category/single/single-category.component';

@NgModule({
    declarations: [HomeComponent, TopicIndexComponent, SidebarComponent, PostComponent, TopicComponent, SingleCategoryComponent, RecentCategoryComponent],
    imports: [
        CommonModule,
        NavbarModule,
        RouterModule.forChild([
            {
                path: '', component: NavbarComponent, canActivate: [CommunityGuard], children: [
                    { path: '', component: HomeComponent, pathMatch: 'full' },
                    {
                        path: 'forums', component: SidebarComponent, children: [
                            { path: '', component: RecentCategoryComponent, pathMatch: 'full' },
                            { path: ':category', component: SingleCategoryComponent, pathMatch: 'full' }
                        ]
                    },
                    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
                ]
            }
        ]),
        MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule,
        FlexLayoutModule
    ]
})
export class CommunityModule {

}