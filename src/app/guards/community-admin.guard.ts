import { CommunityService } from './../services/community.service';
import { GuardService } from './../services/guard.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommunityAdminGuard implements CanActivate {

    constructor(
        public guard: GuardService,
        public community: CommunityService
    ) {

    }

    async canActivate() {
        if (! await this.guard.auth(false)) {
            return false;
        }

        if (! await this.guard.initCommunity()) {
            return false;
        }

        if (!this.community.hasPermission('admin')) {
            return false;
        }

        return true;
    }
}
