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
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule, MatInputModule } from '@angular/material';
import { Apollo } from 'apollo-angular/Apollo';
import { HttpLink } from 'apollo-angular-link-http/HttpLink';
import { ApolloLink, concat } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';
import { PlatformService } from './services/platform.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        MarketingComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'my-app'}),
        RouterModule.forRoot([
            { path: 'home', component: MarketingComponent, pathMatch: 'full' },
            { path: 'login', component: LoginComponent, pathMatch: 'full' },
            { path: '', loadChildren: './community/community.module#CommunityModule'},
            //   { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
        ]),
        HttpClientModule, // provides HttpClient for HttpLink
        ApolloModule,
        HttpLinkModule,
        BrowserAnimationsModule,
        MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule,
        MatProgressSpinnerModule, MatSnackBarModule, MatInputModule
    ],
    providers: [
        HostnameService,
        AuthService,
        PlatformService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(
        apollo: Apollo,
        httpLink: HttpLink,
        hostname: HostnameService,
        auth: AuthService,
        platform: PlatformService
    ) {
        const http = httpLink.create({ uri: 'http://localhost:3000/graphql' });

        const authMiddleware = new ApolloLink((operation, forward) => {
            // add the authorization to the headers
            if (auth.isAuthed()) {
                operation.setContext({
                    headers: new HttpHeaders().set('Authorization', auth.getToken())
                });   
            }

            return forward(operation);
        });

        apollo.create({   
            link: concat(authMiddleware, http),
            cache: new InMemoryCache()
        });

        auth.ghostLogin();
    }
}
