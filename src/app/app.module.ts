import { CommunityService } from './services/community.service';
import { GuardService } from './services/guard.service';
import { AuthGuard } from './guards/auth.guard';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthService } from './services/auth.service';
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
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule, MatInputModule, MatCardModule } from '@angular/material';
import { Apollo } from 'apollo-angular/Apollo';
import { HttpLink } from 'apollo-angular-link-http/HttpLink';
import { ApolloLink, concat } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';
import { PlatformService } from './services/platform.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './global/register/register.component';
import { CreateComponent } from './global/create/create.component';
import { CommunityGuard } from './guards/community.guard';

@NgModule({
    declarations: [
        AppComponent,
        MarketingComponent,
        LoginComponent,
        RegisterComponent,
        CreateComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'my-app'}),
        RouterModule.forRoot([
            { path: 'home', component: MarketingComponent, pathMatch: 'full' },
            { path: 'login', component: LoginComponent, pathMatch: 'full' },
            { path: 'register', component: RegisterComponent, pathMatch: 'full' },
            { path: 'create', component: CreateComponent, pathMatch: 'full', canActivate: [AuthGuard] },
            { path: '', loadChildren: './community/community.module#CommunityModule'},
            //   { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
        ]),
        HttpClientModule, // provides HttpClient for HttpLink
        ApolloModule,
        HttpLinkModule,
        BrowserAnimationsModule,
        MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule,
        MatProgressSpinnerModule, MatSnackBarModule, MatInputModule, MatCardModule
    ],
    providers: [
        CommunityService,
        AuthService,
        PlatformService,
        AuthGuard,
        GuardService,
        CommunityGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(
        apollo: Apollo,
        httpLink: HttpLink,
        communityService: CommunityService,
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
    }
}
