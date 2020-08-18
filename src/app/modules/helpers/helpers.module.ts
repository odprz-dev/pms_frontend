import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteFormComponent } from './delete-form/delete-form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DeleteFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HelpersModule { }
