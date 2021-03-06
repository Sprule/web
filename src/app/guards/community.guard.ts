import { GuardService } from './../services/guard.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommunityGuard implements CanActivate {

    constructor(
        public guard: GuardService
    ) {

    }

    async canActivate() {
        if (! await this.guard.auth(false)) {
            return false;
        }

        if (! await this.guard.initCommunity()) {
            return false;
        }

        return true;
    }
}
