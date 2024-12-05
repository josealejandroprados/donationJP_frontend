import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../shared/shared.module";


@NgModule({
  declarations: [
    RegisterComponent,
    UsersComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    SharedModule
]
})
export class UsersModule { }
