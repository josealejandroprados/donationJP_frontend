import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  {
    path:'',
    component: PrincipalComponent,
    children: [
      {
        path:'donations',
        loadChildren: () => import('../donations/donations.module').then(
          m => m.DonationsModule
        )
      },
      {
        path:'',
        loadChildren: () => import('../users/users.module').then(
          m => m.UsersModule
        )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPrincipalRoutingModule { }
