import {Component, Input} from '@angular/core';
import {BaseService, microService} from "../../shared/services/base.service";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-online-class-link',
  standalone: true,
  imports: [
    NzButtonComponent
  ],
  templateUrl: './online-class-link.component.html',
  styleUrl: './online-class-link.component.scss'
})
export class OnlineClassLinkComponent extends BaseService{
  @Input('event') event : any



  changeLinkEvent(linkInput:any){
    let body = {
      eventID : this.event?.id,
      link : linkInput.value
    }
    this.put(`/${microService.course}/Event/ChangeLinkEvent`, body).subscribe((data:any)=>{
      this.notification.success('عملیات با موفقیت انجام شد');

    })
  }
  openLink(linkInput:any){
    window.open(
      linkInput.value,
      '_blank'
    )
  }
}
