import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './topic-index.component.html',
  styleUrls: ['./topic-index.component.scss']
})
export class TopicIndexComponent implements OnInit {
    posts: [any];

    constructor() { }

    ngOnInit() {

    }

}
