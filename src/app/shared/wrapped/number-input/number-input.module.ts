import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumberInputComponent } from './number-input.component';

@NgModule({
    declarations: [
        NumberInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        NumberInputComponent
    ]
})
export class NumberInputModule { }
