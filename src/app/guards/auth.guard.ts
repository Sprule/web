import { GuardService } from './../services/guard.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public guard: GuardService
    ) {

    }

    async canActivate() {
        return this.guard.auth(false);
    }
}
