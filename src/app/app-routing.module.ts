import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './shared/guards/log-guard';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./modules/base-sitio/base-sitio.module').then(
      m => m.BaseSitioModule
    )
  },
  {
    path:'admin/login',
    loadChildren: () => import('./modules/auth/auth.module').then(
      m => m.AuthModule
    )
  },
  {
    path:'admin/principal',
    loadChildren: () => import('./modules/administracion/admin-principal/admin-principal.module').then(
      m => m.AdminPrincipalModule
    ),
    canActivate: [LoginGuard]
  },
  {path:'admin', redirectTo:'admin/principal/donations', pathMatch:'full'},
  {path:'**', redirectTo:'home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
