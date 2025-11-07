import {AfterViewInit, Component, Injector, OnInit} from '@angular/core';
import {BaseService} from "../../../../../shared/services/base.service";
import {CoursesService} from "../services/courses.service";

@Component({
  selector: 'app-main-courses',
  templateUrl: './main-courses.component.html',
  styleUrl: './main-courses.component.scss'
})
export class MainCoursesComponent extends BaseService implements OnInit, AfterViewInit {
  itemSelect: any;
  eventListData: any

  constructor(injector: Injector, private coursesService: CoursesService) {
    super(injector);
  }

  ngOnInit() {
    this.getData()
  }

  changeQueryParams() {
    this.route.queryParams.subscribe((queryParam: any) => {
      if (queryParam?.filter) {
        this.eventListData = this.eventListDataAll.filter((i: any) => i.eventTypeId == queryParam?.filter)
      } else {
        this.eventListData = this.eventListDataAll
      }


      if (queryParam?.eventId) {
        this.itemSelect = queryParam?.eventId
      } else {
        this.itemSelect = null
        if (this.eventListData) {
          this.router.navigate(['/panel/my-training/courses'], {
            queryParams: {eventId: this.eventListData[0]?.id},
            relativeTo: this.route,
            queryParamsHandling: 'merge'
          })
        }
      }
    })
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   const mainCourses2 = document.getElementById('main-courses-2');
    //   const mainCourses1 = document.getElementById('main-courses-1');
    //   if (mainCourses1 && mainCourses2) {
    //     mainCourses1.style.height = mainCourses2.offsetHeight + 'px';
    //   }
    // }, 0);
  }

  changeEvent(item: any) {
    this.router.navigate(['/panel/my-training/courses'], {
      relativeTo: this.route,
      queryParams: {eventId: item.id},
      queryParamsHandling: 'merge'
    })
  }

  eventListDataAll: any

  getData() {
    this.coursesService.getAllEventList().subscribe((data: any) => {
      this.eventListData = data.data
      this.eventListDataAll = data.data
      this.changeQueryParams()
    })

  }

}
