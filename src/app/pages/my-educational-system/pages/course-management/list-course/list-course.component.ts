import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SwiperComponent} from "swiper/angular";
import {BaseService} from "../../../../../shared/services/base.service";
import {CourseManagementService} from "../services/course-management.service";
import { finalize } from 'rxjs';
import { MicroService } from '../../../../../shared/enum/enum';

@Component({
    selector: 'app-list-course',
    templateUrl: './list-course.component.html',
    styleUrl: './list-course.component.scss',
    standalone: false
})
export class ListCourseComponent extends BaseService implements OnInit{
  type : any
  protected readonly MicroService = MicroService;


  constructor(injector:Injector,protected courseManagementService:CourseManagementService) {
    super(injector);
  }

  ngOnInit() {
    this.courseManagementService.getEventMaster({personID : this.personId}).subscribe((data:any)=>{
      this.data = data.data;
    })
  }
  // getCourse(){
  //   this.courseManagementService.getEventMaster({personID : this.personId}).subscribe((data:any)=>{
  //     this.data = data.data;
  //   })
  // }


  @ViewChild(SwiperComponent) swiper: any;
}
