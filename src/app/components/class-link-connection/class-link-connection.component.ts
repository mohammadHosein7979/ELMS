import {Component, Input} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";

@Component({
  selector: 'app-class-link-connection',
  standalone: true,
  imports: [],
  templateUrl: './class-link-connection.component.html',
  styleUrl: './class-link-connection.component.scss'
})
export class ClassLinkConnectionComponent extends BaseService{
  @Input('active') active : any = true
  @Input('link') link : any
  @Input('eventId') eventId : any
  microService:string = '/courseapi'


  changeLinkEvent(){
    let body = {
      eventId : this.eventId,
      link : this.link
    }
    this.post(`${this.microService}/Event/ChangeLinkEvent`, body).subscribe((data:any)=>{

    })
  }

}
