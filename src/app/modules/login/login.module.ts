import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';


const loginRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent }

];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(loginRoutes)
  ]
})
export class LoginModule { }
