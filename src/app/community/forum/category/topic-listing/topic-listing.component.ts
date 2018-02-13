import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-topic-listing',
    templateUrl: './topic-listing.component.html',
    styleUrls: ['./topic-listing.component.scss']
})
export class TopicListingComponent implements OnInit {
    @Input() topicListing;

    constructor() {
        
    }

    ngOnInit() {
    }

}
