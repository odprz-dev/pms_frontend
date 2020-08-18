import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { UserModalComponent } from './user-modal/user-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HelpersModule } from '../helpers/helpers.module';


const userRoutes: Routes = [
  { path: '', component: UsuariosComponent }
];

@NgModule({
  declarations: [
    UsuariosComponent,
    UserModalComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    HelpersModule,
    RouterModule.forChild(userRoutes)
  ]
})
export class UserModule { }
