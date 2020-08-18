import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';


const userRoutes: Routes = [
  { path: '', component: UsuariosComponent }
];

@NgModule({
  declarations: [
    UsuariosComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule.forChild(userRoutes)
  ]
})
export class UserModule { }
