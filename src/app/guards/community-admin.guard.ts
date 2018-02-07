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
        console.log('community admin check...');
        if (! await this.guard.auth(false)) {
            return false;
        }

        if (! await this.guard.initCommunity()) {
            return false;
        }

        console.log('checking for admin permission.');        
        if (!this.community.hasPermission('admin')) {
            return false;
        }

        console.log('community admin success');
        return true;
    }
}
