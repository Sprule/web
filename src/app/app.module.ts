import { HostnameService } from './services/hostname.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { SuiModule } from 'ng2-semantic-ui';

import { AppComponent } from './app.component';
import { MarketingComponent } from './marketing/marketing.component';
import { LoginComponent } from './global/login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        MarketingComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'my-app'}),
        RouterModule.forRoot([
            { path: 'home', component: MarketingComponent, pathMatch: 'full'},
            { path: '', loadChildren: './community/community.module#CommunityModule'},
            //   { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
        ]),
        HttpClientModule, // provides HttpClient for HttpLink
        ApolloModule,
        HttpLinkModule,
        SuiModule
    ],
    providers: [
        HostnameService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
