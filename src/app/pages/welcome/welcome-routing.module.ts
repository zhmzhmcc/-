import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { UseraddComponent } from './useradd/useradd.component';

const routes: Routes = [
  //  {
  //    path:'',
  //    component:UserinfoComponent
  //  },
  {
    path: 'userinfo',
    component: UserinfoComponent
  }, {
    path: 'useradd',
    component: UseraddComponent

  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
