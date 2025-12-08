import { CoursesService } from './../../../pages/my-training/pages/courses/services/courses.service';
import { Component, Injector, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { NgIf } from "@angular/common";
import { NzTimelineItemComponent, NzTimelineComponent } from "ng-zorro-antd/timeline";
import { NzSkeletonComponent } from "ng-zorro-antd/skeleton";
import { LikeComponent } from '../../../components/like/like.component';
import { EnteringClassComponent } from '../../../components/entering-class/entering-class.component';
import { BaseService } from '../../../shared/services/base.service';
import { TypeClasses } from '../../../pages/my-educational-system/pages/classes/services/classes.service';
import { finalize } from 'rxjs';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {EducationService} from "../../../pages/education/services/education.service";

@Component({
  selector: 'app-detail-education',
  templateUrl: './detail-education.component.html',
  styleUrl: './detail-education.component.scss',
  imports: [
    NgIf,
    NzTimelineItemComponent,
    NzTimelineComponent,
    LikeComponent,
    EnteringClassComponent,
    NzSkeletonComponent,
    NzButtonComponent
  ]
})
export class DetailEducationComponent extends BaseService implements OnInit {
  eventId: any
  override data: any;
  selectedEventMaster: any;
  selectEpisode: any = { id: 1, title: 'فصل اول - مقدمه' };
  isLoading = false;

  constructor(injector: Injector, private coursesService: CoursesService,private educationService: EducationService) {
    super(injector);
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id']
    this.getEventDetails(this.eventId)
  }

  getEventDetails(eventId: number): void {
    if (!eventId) return;

    this.isLoading = true;

    const body = {
      eventId: +eventId,
    };

    this.coursesService.getEventDetails(body).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (data: any) => {
        this.data = data.data;
        this.selectedEventMaster = this.data?.event?.eventMasters?.[0];
      }
    });
  }

  changeEventMaster(data: any, index: any, type: any): void {
    if (data[index + type]) {
      this.selectedEventMaster = data[index + type];
    } else {
      this.selectedEventMaster = data[0];
    }
  }

  changeEpisode(item: any): void {
    if (this.selectEpisode?.id === item?.id) {
      this.selectEpisode = null;
    } else {
      this.selectEpisode = item;
    }
  }
  dataSelectHeadlineDetail: any
  dataSession: any

  selectHeadlineDetail(item: any): void {
    this.dataSelectHeadlineDetail = item;
    this.getAllSession()
  }
  getAllSession() {
    this.coursesService.getSession({ "filter": { "eventHeadlineDetailIdList": [this.dataSelectHeadlineDetail?.id] } }).subscribe({
      next: (data: any) => {
        this.dataSession = data?.data;
      }
    })
  }
  buyEvent() {
    if (this.userService.personId){
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
    }else {
      this.notification.error('لطفا ابتدا ثبت نام کنید.')
      this.router.navigateByUrl('/auth/login');

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
  goEvent(){

  }
  protected readonly TypeClasses = TypeClasses;
}
