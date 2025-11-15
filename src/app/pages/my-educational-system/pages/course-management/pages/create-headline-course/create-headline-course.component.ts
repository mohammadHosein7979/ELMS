import {Component, Injector, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {CourseManagementService} from "../../services/course-management.service";
import {BaseService} from "../../../../../../shared/services/base.service";

@Component({
    selector: 'app-create-headline-course',
    templateUrl: './create-headline-course.component.html',
    styleUrl: './create-headline-course.component.scss',
    standalone: false
})
export class CreateHeadlineCourseComponent extends BaseService implements OnInit {
  constructor(injector: Injector, private courseManagementService: CourseManagementService) {
    super(injector)
  }

  dataCourseManagement: any = []
  dataHeadLineDetail: any = []
  formHeadline: FormGroup = this.fb.group({
    id: [0],
    name: [null, [Validators.required]],
    duration: [null, [Validators.required, Validators.pattern(/^([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$/)]],
    eventId: [null],
    index: [null],
  });
  formHeadlineDetail: FormGroup = this.fb.group({
    id: [0],
    name: [null, [Validators.required]],
    eventHeadlineId: [null, [Validators.required]],
    duration: [null, [Validators.required, Validators.pattern(/^([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$/)]],
    index: [null],
  });
  eventId: any
  editModeHeadline: any = {
    flag: false,
    index: null
  };
  editModeHeadlineDetail: any = {
    flag: false,
    index: null
  };
  dataSelectHeadline: any;


  ngOnInit() {
    this.eventId = +this.route.snapshot.params['id']
    this.formHeadline.patchValue({
      eventId: this.eventId,
    })
    this.getEventHeadline()
  }

  submitHeadlineDetail() {
    if (this.editModeHeadlineDetail.flag) {
      this.courseManagementService.updateEventHeadlineDetail({dto: this.formHeadlineDetail.value}).subscribe((data: any) => {
        this.dataHeadLineDetail[this.editModeHeadlineDetail.index] = data.data
        this.formHeadlineDetail.reset({
          eventHeadlineId: this.dataSelectHeadline.id,
          id: 0
        })
        this.editModeHeadlineDetail.flag = false
      })

    } else {
      this.formHeadlineDetail.patchValue({
        index: this.dataHeadLineDetail.length,
        eventHeadlineId: this.dataSelectHeadline.id
      })
      this.courseManagementService.insertEventHeadlineDetail({dto: this.formHeadlineDetail.value}).subscribe((data: any) => {
        this.dataHeadLineDetail.push(data?.data)
        this.formHeadline.reset({
          eventId: this.eventId,
          id: 0
        })

      })

    }
  }

  getHeadlineDetail() {
    this.courseManagementService.getEventHeadlineDetail({filter: {eventHeadlineIdList: [this.dataSelectHeadline?.id]}}).subscribe((data: any) => {
      this.dataHeadLineDetail = data?.data;
    })
  }


  editCourseManagementDetail(item: any, index: any) {
    this.editModeHeadlineDetail.flag = true
    this.editModeHeadlineDetail.index = index
    this.formHeadlineDetail.patchValue(item)
  }

  removeCourseManagementDetail(item: any, index: number) {
    this.courseManagementService.removeEventHeadlineDetail({id: item?.id}).subscribe((data: any) => {
      this.dataHeadLineDetail.splice(index, 1)
    })
  }










  selectHeadline(item: any) {
    if (this.dataSelectHeadline == item) {
      this.dataSelectHeadline = null
      this.dataHeadLineDetail = []
    } else {
      this.dataSelectHeadline = item
      this.getHeadlineDetail()
    }
  }

  getEventHeadline() {
    this.courseManagementService.getEventHeadline({filter: {eventIdList: [this.eventId]}}).subscribe((data: any) => {
      this.dataCourseManagement = data.data
    })
  }

  submitHeadline() {
    if (this.editModeHeadline.flag) {
      this.courseManagementService.updateEventHeadline({dto: this.formHeadline.value}).subscribe((data: any) => {
        this.dataCourseManagement[this.editModeHeadline.index] = data.data
        this.formHeadline.reset({
          eventId: this.eventId,
          id: 0
        })
        this.editModeHeadline.flag = false
      })

    } else {
      this.formHeadline.patchValue({
        index: this.dataCourseManagement.length
      })
      this.courseManagementService.insertEventHeadline({dto: this.formHeadline.value}).subscribe((data: any) => {
        this.dataCourseManagement.push(data?.data)
        this.formHeadline.reset({
          eventId: this.eventId,
          id: 0
        })

      })

    }
  }

  editCourseManagement(item: any, index: any) {
    this.editModeHeadline.flag = true
    this.editModeHeadline.index = index
    this.formHeadline.patchValue(item)
  }

  removeCourseManagement(item: any, index: number) {
    this.courseManagementService.removeEventHeadline({id: item?.id}).subscribe((data: any) => {
      this.dataCourseManagement.splice(index, 1)
    })
  }

  onTimeInput(event: any) {
    const input = event.target as HTMLInputElement;
    // فقط عدد و دو نقطه رو نگه می‌داریم
    let value = input.value.replace(/[^0-9:]/g, '');

    // به صورت خودکار ساختار رو اصلاح می‌کنیم
    if (value.length > 2 && value[2] !== ':') {
      value = value.slice(0, 2) + ':' + value.slice(2);
    }
    if (value.length > 5 && value[5] !== ':') {
      value = value.slice(0, 5) + ':' + value.slice(5);
    }

    // فقط تا 8 کاراکتر
    value = value.slice(0, 8);
    input.value = value;
  }


}
