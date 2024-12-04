import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';

const routes: Routes = [
  {
    path:'',
    component: BaseComponent,
    children: [
      {path:'', redirectTo:'home', pathMatch:'full'},
      {
        path:'',
        loadChildren: () => import('../welcome/welcome.module').then(
          m => m.WelcomeModule
        )
      },
      {
        path:'',
        loadChildren: () => import('../about/about.module').then(
          m => m.AboutModule
        )
      },
      {
        path:'',
        loadChildren: () => import('../contact/contact.module').then(
          m => m.ContactModule
        )
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseSitioRoutingModule { }
