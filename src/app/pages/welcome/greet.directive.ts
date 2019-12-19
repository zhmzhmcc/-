import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appGreet]'
})
export class GreetDirective {

  constructor() { 
  }
  @HostBinding('style.font-size') fontSize = '40px';


}
