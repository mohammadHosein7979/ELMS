import {Component, Injector, OnInit} from '@angular/core';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormGroup, Validators} from "@angular/forms";
import {BaseService} from "../../../../../shared/services/base.service";
import {CourseManagementService} from "../services/course-management.service";
import {finalize} from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss',
  standalone: false
})
export class CreateCourseComponent extends BaseService implements OnInit {

  isEditMode: boolean = false;
  courseId: number | null = null;
  dataDefault:any

  constructor(
    injector: Injector,
    private courseManagementService: CourseManagementService,
  ) {
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
    this.checkEditMode();
    this.createForm();
    this.getCourse();
    this.getEventType();
  }

  checkEditMode() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.courseId = +params['id'];
        this.loadCourseData();
      }
    });
  }

  loadCourseData() {
    if (this.courseId) {
      this.dataCourse.loading = true;
      this.courseManagementService.getEvent({filter: {idList: [this.courseId]}})
        .pipe(finalize(() => this.dataCourse.loading = false))
        .subscribe((data: any) => {
          if (data.data && data.data.length > 0) {
            this.dataDefault = data.data[0]
            this.populateForm(data.data[0]);
          }
        });
    }
  }

  populateForm(courseData: any) {
    this.formSend.patchValue({
      eventTypeId: courseData.eventTypeId,
      fileId: courseData.fileId,
      courseId: courseData.courseId,
      title: courseData.title,
      price: courseData.price,
      duration: courseData.duration,
      registrationStartDate: courseData.registrationStartDate,
      registrationEndDate: courseData.registrationEndDate,
      startDateTime: courseData.startDateTime,
      endDateTime: courseData.endDateTime,
      capacity: courseData.capacity,
      description: courseData.description,
      adminDescription: courseData.adminDescription,
      location: courseData.location,
      status: courseData.status,
      link: courseData.link,
      isCertificate: courseData.isCertificate,
      isExam: courseData.isExam,
      countExam: courseData.countExam,
      mediaId: courseData.mediaId,
      masterId: courseData.masterId
    });
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
      location: [''],
      status: [1],
      link: [null],
      isCertificate: [true],
      isExam: [true],
      countExam: [1],
      mediaId: [null],
      masterId: [this.personId]
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
    if (this.formSend.invalid) {
      this.notification.error('لطفا تمام فیلدهای обязаاری را پر کنید');
      return;
    }

    this.loadingButton = true;

    const submitObservable = this.isEditMode
      ? this.courseManagementService.updateEvent({dto: {...this.form.value, id: this.courseId}})
      : this.courseManagementService.insertEvent({dto: this.form.value});

    submitObservable.pipe(
      finalize(() => this.loadingButton = false)
    ).subscribe((data: any) => {
      const message = this.isEditMode ? 'با موفقیت ویرایش شد.' : 'با موفقیت ذخیره شد.';
      this.notification.success(message);
      this.router.navigateByUrl('/panel/my-educational-system/course-management');
    });
  }

  resetForm() {
    if (confirm('آیا از شروع مجدد فرم اطمینان دارید؟')) {
      this.formSend.reset();
      this.step = 1;
      this.formSend.patchValue({
        eventTypeId: 1,
        capacity: 1,
        status: 1,
        isCertificate: true,
        isExam: true,
        countExam: 1,
        masterId: this.personId
      });
    }
  }
}
