import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-topic-listing',
    templateUrl: './topic-listing.component.html',
    styleUrls: ['./topic-listing.component.scss']
})
export class TopicListingComponent implements OnInit {
    @Input() topicListing;
    latestPost;

    constructor() {

    }

    ngOnInit() {
        if (this.topicListing.replies && this.topicListing.replies.length > 0) {
            this.latestPost = this.topicListing.replies[this.topicListing.replies.length - 1];
        } else {
            this.latestPost = this.topicListing.post;
        }
    }

}
