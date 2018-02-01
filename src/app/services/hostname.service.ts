import { Injectable } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Inject, Injector, PLATFORM_ID } from '@angular/core';

@Injectable()
export class HostnameService {
    public community: string = '';

    constructor() { 
        let hostname = window.location.hostname;
        console.log('hostname: ' + hostname);

        if (hostname == 'localhost') {
            this.community = 'dev';
        } else {
            this.community = hostname.split('.')[0];
        }

        console.log('community: ' + this.community);
    }
    

}
