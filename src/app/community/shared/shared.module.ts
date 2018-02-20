import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { UserRoleTagComponent } from '../user/user-role-tag/user-role-tag.component';

@NgModule({
    imports: [
        CommonModule,
        MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule,
        FlexLayoutModule,
        RouterModule
    ],
    declarations: [UserRoleTagComponent],
    exports: [
        UserRoleTagComponent,
        MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule,
        FlexLayoutModule
    ]
})
export class SharedModule { }