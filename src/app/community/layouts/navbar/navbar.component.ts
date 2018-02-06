import { CommunityService } from './../../../services/community.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        public communityService: CommunityService
    ) { }

    ngOnInit() {
    }

}
