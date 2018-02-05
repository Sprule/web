import { FormBuilder } from '@angular/forms/';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core'
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular/Apollo';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {
    loading: boolean = false;
    formGroup: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public apollo: Apollo
    ) {
        this.formGroup = this.formBuilder.group({
            nameCtrl: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
            subdomainCtrl: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]]
        });
    }

    create(name: string, subdomain: string) {

    }

    ngOnInit() {
      
    }

}
