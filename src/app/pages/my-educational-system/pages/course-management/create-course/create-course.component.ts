import {Component, Injector, OnInit} from '@angular/core';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "@ckeditor/ckeditor5-build-classic";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseService} from "../../../../../shared/services/base.service";
import {CourseManagementService} from "../services/course-management.service";
import {finalize} from "rxjs";

@Component({
    selector: 'app-create-course',
    templateUrl: './create-course.component.html',
    styleUrl: './create-course.component.scss',
    standalone: false
})
export class CreateCourseComponent extends BaseService implements OnInit {
  constructor(injector: Injector, private courseManagementService: CourseManagementService) {
    super(injector)
  }

  formSend !: FormGroup
  dataCourse: any = {
    data: [],
    loading: false
  }
  dataEventType: any
  step: any = 1
  listAnswer: any = [
    {id: 1, answerTrue: false},
    {id: 2, answerTrue: true},
    {id: 3, answerTrue: false},
    {id: 4, answerTrue: false},
  ]
  public Editor = ClassicEditor
  public config = {
    language: {
      ui: 'fa',
      content: 'ar'
    }
  }

  ngOnInit() {
    this.createForm()
    this.getCourse()
    this.getEventType()
  }

  getCourse() {
    this.dataCourse.loading = true
    this.courseManagementService.getCourse().subscribe((data: any) => {
      this.dataCourse.data = data.data;
      this.dataCourse.loading = false

    })
  }

  getEventType() {
    this.courseManagementService.getEventType().subscribe((data: any) => {
      this.dataEventType = data.data;
    })
  }

  createForm() {
    this.formSend = this.fb.group({
      eventTypeId: [1],
      fileId: [null],
      courseId: [null, Validators.required],
      title: [null, Validators.required],
      price: [null, Validators.required],
      duration: [null, Validators.required],
      registrationStartDate: [null],
      registrationEndDate: [null],
      startDateTime: [null],
      endDateTime: [null],
      capacity: [1],
      description: [null],
      adminDescription: [null],


      "location": [''],
      "status": [1],
      "link": [null],
      "isCertificate": [true],
      "isExam": [true],
      "countExam": [1],
      "mediaId": [null],
      "masterId": [this.personId]
    });
  }

  changeType(value: any) {
    this.form.patchValue({
      eventTypeId: value,
      link: null,
      location: null,
    })

  }

  get form() {
    return this.formSend;
  }

  changeStep(type: string) {

    if (type == 'next') {
      if (this.step < 6) {
        this.step = this.step + 1
      }
    } else {
      if (this.step > 1) {
        this.step = this.step - 1
      }
    }

  }

  submit() {
    this.loadingButton = true
    this.courseManagementService.insertEvent({dto: this.form.value}).pipe(
      finalize(() => this.loadingButton = false)
    ).subscribe((data: any) => {

      this.notification.success('با موفقیت ذخیره شد.')
      this.router.navigateByUrl('/panel/my-educational-system/course-management')
    })
  }


}
