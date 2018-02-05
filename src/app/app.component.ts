import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
    constructor(
        
    ) { };
}
