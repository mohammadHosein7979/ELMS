import {Component, inject, Inject, Input} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {NzButtonComponent} from "ng-zorro-antd/button";
import { Location } from '@angular/common';

@Component({
  selector: 'app-button-back',
  standalone: true,
  imports: [
    NzButtonComponent
  ],
  templateUrl: './button-back.component.html',
  styleUrl: './button-back.component.scss'
})
export class ButtonBackComponent extends BaseService{
  @Input('url') url :any
  private location = inject(Location);



  back(){
      if (this.url){
        this.router.navigateByUrl(this.url)
      }else {
        this.location.back();
      }
  }

}
