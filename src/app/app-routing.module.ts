import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AutGuard} from './guards/aut.guard';
import {NoLoginGuard} from './guards/no-login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate : [AutGuard] },
  { path: 'details/:id', loadChildren: './pages/chat-details/chat-details.module#ChatDetailsPageModule', canActivate : [AutGuard] },
  { path: 'details', loadChildren: './pages/chat-details/chat-details.module#ChatDetailsPageModule', canActivate : [AutGuard] },
  { path: 'login', loadChildren: './componentes/login/login.module#LoginPageModule', canActivate : [NoLoginGuard] },
  { path: 'registro', loadChildren: './componentes/registro/registro.module#RegistroPageModule', canActivate : [NoLoginGuard]  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
