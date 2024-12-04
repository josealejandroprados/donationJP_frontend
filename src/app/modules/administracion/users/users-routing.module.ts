import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { RegisterComponent } from './components/register/register.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const routes: Routes = [
  {path:'users', component: UsersComponent},
  {path:'register', component: RegisterComponent},
  {path:'updateuser/:id', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
