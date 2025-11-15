import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SwiperComponent} from "swiper/angular";
import {BaseService} from "../../../../../shared/services/base.service";
import {LayoutService} from "../../../../../layout/services/layout.service";
import {CourseManagementService} from "../services/course-management.service";

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrl: './list-course.component.scss'
})
export class ListCourseComponent extends BaseService implements OnInit{
  type : any


  constructor(injector:Injector,protected courseManagementService:CourseManagementService) {
    super(injector);
  }

  ngOnInit() {
    this.courseManagementService.getEventMaster({personID : this.personId}).subscribe((data:any)=>{
      this.data = data.data;
    })
  }


  @ViewChild(SwiperComponent) swiper: any;
}
