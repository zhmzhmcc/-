import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { UserinfoComponent } from './pages/welcome/userinfo/userinfo.component';
import { HomeComponent } from './pages/home/home.component';
import { UseraddComponent } from './pages/welcome/useradd/useradd.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },//异步加载
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  // {
  //   path: 'home',
  //   component: UserinfoComponent,
  //   // children: [
  //   //   {
  //   //     path: 'welcome',
  //   //     loadChildren: './pages/welcome/welcome.module#WelcomeModule'//懒加载技术
  //   //   }
  //   // ]

  // },
  {
    path: 'welcome',
    component: WelcomeComponent,
    children: [
      {
        path: 'userinfo',
        component: UserinfoComponent
      },
      {
        path: 'useradd',
        component: UseraddComponent
    
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
