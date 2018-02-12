import { MatSnackBar } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { CommunityService } from '../../../services/community.service';

@Component({
  selector: 'app-category',
  template: `
    <button mat-button routerLink='/forums/{{id}}'>{{name}}</button>
  `,
  styles: []
})
export abstract class CategoryComponent implements OnInit {

    constructor(
        public apollo: Apollo,
        public community: CommunityService,
        public snackbar: MatSnackBar
    ) {
        
    }

    ngOnInit() {
        
    }

    async loadTopics() {
        try {
            await this.getTopicListings(0, 20);
        } catch (error) {
            console.log(error);
            this.snackbar.open('Failed to load topics. Try again?', 'close', {
                duration: 7000
            })
        }
    }

    abstract async getTopicListings(offset: number, limit: number);

    abstract async getTopicName();

    abstract async getTopicDesc();

}
