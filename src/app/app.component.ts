import { HostnameService } from './services/hostname.service';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Universal Demo using Angular and Angular CLI</h1>
    <a routerLink="/">Home</a>
    <a routerLink="/lazy">Lazy</a>
    <a routerLink="/lazy/nested">Lazy_Nested</a>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
    constructor(
        hostname: HostnameService,
        auth: AuthService
    ) { };
}
