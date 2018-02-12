import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-forum-topic',
    templateUrl: "./topic.component.html",
    styleUrls: ["./topic.component.scss"]
})
export class TopicComponent implements OnInit {
    @Input() post;

    constructor() { }

    ngOnInit() {
    }

}
