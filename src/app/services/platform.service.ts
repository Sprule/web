import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

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
