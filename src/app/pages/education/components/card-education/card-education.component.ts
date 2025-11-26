import { Component, Injector, Input, OnInit, inject } from '@angular/core';
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { EnumEducationStatus, EnumEducationType } from "../../../../shared/enum/enum";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { BaseService } from '../../../../shared/services/base.service';
import { EducationService } from '../../services/education.service';

@Component({
  selector: 'app-card-education',
  templateUrl: './card-education.component.html',
  styleUrl: './card-education.component.scss',
  imports: [
    NgIf,
    RouterLink,
    NzButtonComponent
  ]
})
export class CardEducationComponent extends BaseService {

  @Input('data') override data: any

  constructor(injector: Injector, private educationService: EducationService) {
    super(injector);
  }

  buyEvent() {
    if (this.data?.isFull) {
      return;
    } else {
      if (this.data?.finalPrice > 0) {
        // go to buy page
      } else {
        // go to register page
        this.eventStudentInsert();
      }
    }

  }
  eventStudentInsert() {
    this.educationService.eventStudentInsert({dto:{
      eventId: this.data.id,
      personId:this.personId,
      isRegister: true
    }}).subscribe((res: any) => {
      this.notification.success('ثبت نام با موفقیت انجام شد');
      this.data.isFull = true;
    })
  }

  protected readonly EnumEducationStatus = EnumEducationStatus;
  protected readonly EnumEducationType = EnumEducationType;
}
