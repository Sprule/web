import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

@Injectable()
export class ForumService {
    public selectedCategory;

    constructor(
        @Inject(PLATFORM_ID) public platformId: Object
    ) {

    }

    public setCategory(category) {
        this.selectedCategory = category;
    }

}
