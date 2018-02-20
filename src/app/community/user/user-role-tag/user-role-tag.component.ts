import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-role-tag',
  templateUrl: './user-role-tag.component.html',
  styleUrls: ['./user-role-tag.component.scss']
})
export class UserRoleTagComponent implements OnInit {
    @Input() role;

    constructor() { }

    ngOnInit() {
    }

}
