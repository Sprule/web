import { FormBuilder, Validators } from '@angular/forms/';
import { Apollo } from 'apollo-angular/Apollo';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import gql from 'graphql-tag';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    content;

    config = {
        heightMin: 400
    }

    constructor(
        
    ) {
        
    }

    ngOnInit() {
        
    }

}
