import { MatSnackBar, PageEvent } from '@angular/material';
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
    topicListings;
    loadingTopicListings: boolean;

    // MatPaginator Inputs
    length = 100;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent;

    constructor(
        public apollo: Apollo,
        public community: CommunityService,
        public snackbar: MatSnackBar
    ) {
        
    }

    ngOnInit() {
        
    }

    async loadTopics() {
        this.loadingTopicListings = true;
        try {
            this.topicListings = await this.getTopicListings(0, 20);
        } catch (error) {
            console.log(error);
            this.snackbar.open('Failed to load topics. Try again?', 'Close', {
                duration: 7000
            })
        }
        this.loadingTopicListings = false;
    }

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

    abstract async getTopicListings(offset: number, limit: number);

    abstract async getTopicName();

    abstract async getTopicDesc();

}
