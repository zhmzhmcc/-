import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { CommonModule } from '@angular/common';
import { UseraddComponent } from './useradd/useradd.component';
import { GreetDirective } from './greet.directive';
import { MoveDirective } from './move.directive';
// import { DragDirective } from './directive/drag-directive';

@NgModule({
  imports: [
    WelcomeRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
    
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  declarations: [ UserinfoComponent, UseraddComponent,GreetDirective, MoveDirective],

})
export class WelcomeModule { }
