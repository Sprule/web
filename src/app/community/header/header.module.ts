import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule,
        FlexLayoutModule,
        RouterModule
    ],
    declarations: [HeaderComponent],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule { }