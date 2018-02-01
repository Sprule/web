import { isPlatformBrowser } from '@angular/common/src/platform_id';
import { Injectable, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core/src/application_tokens';

@Injectable()
export class PlatformService {

    constructor(
        @Inject(PLATFORM_ID) public platformId: Object
    ) { 
      
    }

    public isBrowser() {
        return isPlatformBrowser(this.platformId);
    }

    public isServer() {
        return isPlatformBrowser(this.platformId);
    }

}
