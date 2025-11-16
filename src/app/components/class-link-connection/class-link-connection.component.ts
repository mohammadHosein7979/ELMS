import {Component, Input} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {MicroService} from "../../shared/enum/enum";

@Component({
    selector: 'app-class-link-connection',
    imports: [],
    templateUrl: './class-link-connection.component.html',
    styleUrl: './class-link-connection.component.scss'
})
export class ClassLinkConnectionComponent extends BaseService{
  @Input('active') active : any = true
  @Input('link') link : any
  @Input('eventId') eventId : any


  changeLinkEvent(){
    let body = {
      eventId : this.eventId,
      link : this.link
    }
    this.post(`${MicroService.course}/Event/ChangeLinkEvent`, body).subscribe(()=>{})
  }

}
