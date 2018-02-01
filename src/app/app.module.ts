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
import { ApolloLink, concat } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http/src/headers';

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
        const http = httpLink.create({ uri: 'http://localhost:3000/graphql' });

        const authMiddleware = new ApolloLink((operation, forward) => {
            // add the authorization to the headers
            operation.setContext({
                headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || null)
            });

            return forward(operation);
        });

        apollo.create({   
            link: concat(authMiddleware, http),
            cache: new InMemoryCache()
        });
    }
}
