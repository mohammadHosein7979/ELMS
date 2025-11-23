import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {MicroService} from "../../shared/enum/enum";

@Component({
    selector: 'app-online-class-link',
    imports: [
        NzButtonComponent
    ],
    templateUrl: './online-class-link.component.html',
    styleUrl: './online-class-link.component.scss'
})
export class OnlineClassLinkComponent extends BaseService implements OnChanges{
  @Input('event') event: any;
  @ViewChild('linkInput') linkInput!: ElementRef<HTMLInputElement>;

  linkValue: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['event']) {
      this.linkValue = this.event?.link || '';
    }
  }

  changeLinkEvent() {
    let body = {
      eventID: this.event?.id,
      link: this.linkValue
    }
    this.put(`/${MicroService.course}/Event/ChangeLinkEvent`, body).subscribe((data: any) => {
      this.notification.success('عملیات با موفقیت انجام شد');
    })
  }

  openLink() {
    if (this.linkValue) {
      window.open(this.linkValue, '_blank');
    }
  }

  // changeLinkEvent(linkInput:any){
  //   let body = {
  //     eventID : this.event?.id,
  //     link : linkInput.value
  //   }
  //   this.put(`/${MicroService.course}/Event/ChangeLinkEvent`, body).subscribe((data:any)=>{
  //     this.notification.success('عملیات با موفقیت انجام شد');
  //
  //   })
  // }
  // openLink(linkInput:any){
  //   window.open(
  //     linkInput.value,
  //     '_blank'
  //   )
  // }
}
