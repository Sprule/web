import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-category',
  template: `
    <button mat-button routerLink='/forums/{{id}}'>{{name}}</button>
  `,
  styles: []
})
export class CategoryComponent implements OnInit {
    @Input() name: string;
    @Input() id: string;

    constructor() {}

    ngOnInit() {
        
    }

}
