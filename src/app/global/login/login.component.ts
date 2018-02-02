import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms/';
import { Validators } from '@angular/forms/';
import { FormBuilder } from '@angular/forms/';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: []
})
export class LoginComponent {
    loading: boolean = false;
    loginFormGroup: FormGroup;
    hidePassword: boolean = true;

    constructor(
        public auth: AuthService,
        public snackbar: MatSnackBar,
        public formBuilder: FormBuilder
    ) {
        this.loginFormGroup = this.formBuilder.group({
            emailCtrl: ['', [Validators.required, Validators.email]],
            passwordCtrl: ['', Validators.required]
        })
    }

    async login(email: string, password: string) {
        this.loading = true;

        try {
            await this.auth.login(email, password);
        } catch (e) {
            console.log('caught error');
            this.snackbar.open(e, 'close', {
                duration: 7000
            });
        }

        this.loading = false;
    }

}
