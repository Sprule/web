import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthService } from './services/auth.service';
import { HostnameService } from './services/hostname.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MarketingComponent } from './marketing/marketing.component';
import { LoginComponent } from './global/login/login.component';
import { MatButtonModule } from '@angular/material';
import { Apollo } from 'apollo-angular/Apollo';
import { HttpLink } from 'apollo-angular-link-http/HttpLink';

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
        BrowserAnimationsModule,
        MatButtonModule
    ],
    providers: [
        HostnameService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(
        apollo: Apollo,
        httpLink: HttpLink
    ) {
        apollo.create({
            // By default, this client will send queries to the
            // `/graphql` endpoint on the same host
            link: httpLink.create({uri: 'http://localhost:3000/graphql'}),
            cache: new InMemoryCache()
        });
    }
}
