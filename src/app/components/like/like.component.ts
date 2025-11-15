import {Component, Input} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {MicroService} from "../../shared/enum/enum";

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [
    NzButtonComponent
  ],
  templateUrl: './like.component.html',
  styleUrl: './like.component.scss'
})
export class LikeComponent extends BaseService{
  @Input('likeCount') likeCount :any
  @Input('url') url :any
  @Input('eventId') eventId :any
  loadingLike:boolean = false
  loadingDisLike:boolean = false


  like(type:any){
    if (type == true){
      this.loadingLike = true
    }else {
      this.loadingDisLike = true
    }
    this.post(`/${MicroService.course}${this.url}`,{
      "personId": this.personId,
      "eventId": this.eventId,
      "likeStatus": type
    }).subscribe(()=>{
      this.likeCount = type == true ? this.likeCount + 1 : this.likeCount - 1
      this.loadingLike = false
      this.loadingDisLike = false
    })
  }

}
