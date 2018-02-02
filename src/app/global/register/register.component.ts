import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms/';
import { Validators } from '@angular/forms/';
import { FormBuilder } from '@angular/forms/';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
    loading: boolean = false;
    formGroup: FormGroup;
    hidePassword: boolean = true;

    constructor(
        public auth: AuthService,
        public snackbar: MatSnackBar,
        public formBuilder: FormBuilder
    ) {
        this.formGroup = this.formBuilder.group({
            nameCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
            emailCtrl: ['', [Validators.required, Validators.email]],
            passwordCtrl: ['', Validators.required]
        })
    }

    async register(name: string, email: string, password: string) {
        this.loading = true;
        try {
            await this.auth.register(name, email, password)
        } catch (err) {
            this.snackbar.open(err, 'close', {
                duration: 7000
            })
        }
        this.loading = false;
    }

    ngOnInit() {
    }

}
