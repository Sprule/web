import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forum-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    @Input() post;

    constructor() {
        
    }

    ngOnInit() {
    }

}
