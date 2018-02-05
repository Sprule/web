import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular/Apollo';
import { Router } from '@angular/router';

@Injectable()
export class GuardService {

    constructor(
        public apollo: Apollo,
        public authService: AuthService,
        public router: Router
    ) {
        
    }

    /**
     * 
     * @param allowGuest If false, guests will be redirected to login
     */
    async auth(allowGuest: boolean) {
        if (this.authService.isAuthed()) {
            return true;
        }

        if (this.authService.getToken()) {
            let result = await this.authService.ghostLogin();
            if (result) {
                return true;
            }
        }

        if (allowGuest) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }    
}
