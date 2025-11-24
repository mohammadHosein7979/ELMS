import {Component, inject, input} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {NzButtonComponent} from "ng-zorro-antd/button";
import { Location } from '@angular/common';

@Component({
  selector: 'app-button-back',
  imports: [
    NzButtonComponent
  ],
  templateUrl: './button-back.component.html',
  standalone: true,
  styleUrl: './button-back.component.scss'
})
export class ButtonBackComponent extends BaseService{
  url = input('')
  private location = inject(Location);
  back(){
      if (this.url()){
        this.router.navigateByUrl(this.url())
      }else {
        this.location.back();
      }
  }

}
