import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-topic-listing',
    templateUrl: './topic-listing.component.html',
    styleUrls: ['./topic-listing.component.scss']
})
export class TopicListingComponent implements OnInit {
    @Input() topic;
    latestPost;

    constructor() {

    }

    ngOnInit() {
        if (this.topic.replies && this.topic.replies.length > 0) {
            this.latestPost = this.topic.replies[this.topic.replies.length - 1];
        } else {
            this.latestPost = this.topic.post;
        }
    }

}
