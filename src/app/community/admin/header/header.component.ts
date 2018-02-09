import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
    @Input() title;
    @Input() subtitle;

    constructor() { }

    ngOnInit() {
        
    }

}
