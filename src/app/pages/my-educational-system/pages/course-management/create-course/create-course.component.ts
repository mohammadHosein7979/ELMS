import { Component, Injector, OnInit } from '@angular/core';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormGroup, Validators } from "@angular/forms";
import { BaseService } from "../../../../../shared/services/base.service";
import { CourseManagementService } from "../services/course-management.service";
import { finalize } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
  standalone: false
})
export class CreateCourseComponent extends BaseService implements OnInit {

  isEditMode: boolean = false;
  courseId: number | null = null;
  dataDefault: any;
  dataConfig: any;

  constructor(
    injector: Injector,
    private courseManagementService: CourseManagementService,
  ) {
    super(injector);
  }

  formSend!: FormGroup;
  dataCourse: any = {
    data: [],
    loading: false
  };
  dataEventType: any;
  step: any = 1;
  public Editor = ClassicEditor;
  public config = {
    language: {
      ui: 'fa',
      content: 'ar'
    }
  };

  // متغیرهای محاسبات مالی
  taxAmount: number = 0;
  siteShare: number = 0;
  netIncome: number = 0;

  // ضرایب پیش فرض
  taxRate: number = 0; // 15%
  siteRate: number = 0; // 15%

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.createForm();
    this.checkEditMode();

    // ایجاد observable ها
    const courseRequest = this.getCourse();
    const eventTypeRequest = this.getEventType();
    const configRequest = this.getConfig();

    let requests = [courseRequest, eventTypeRequest, configRequest];

    // اگر در حالت edit هستیم، loadCourseData را اضافه می‌کنیم
    if (this.isEditMode && this.courseId) {
      const courseDataRequest = this.loadCourseData();
      requests = [courseDataRequest, ...requests];
    }

    // اجرای تمام درخواست‌ها به صورت موازی
    forkJoin(requests).subscribe({
      next: (results: any[]) => {
        // مدیریت نتایج بر اساس ترتیب
        let courseDataResult, courseResult, eventTypeResult, configResult;

        if (this.isEditMode && this.courseId) {
          [courseDataResult, courseResult, eventTypeResult, configResult] = results;

          // پردازش داده‌های دوره برای حالت edit
          if (courseDataResult && courseDataResult.data && courseDataResult.data.length > 0) {
            this.dataDefault = courseDataResult.data[0];
            this.populateForm(courseDataResult.data[0]);
          }
        } else {
          [courseResult, eventTypeResult, configResult] = results;
        }

        // پردازش سایر نتایج
        if (courseResult) {
          this.dataCourse.data = courseResult.data;
        }
        if (eventTypeResult) {
          this.dataEventType = eventTypeResult.data;
        }
        if (configResult) {
          this.dataConfig = configResult.data;
          this.setConfigRates();
        }

        // تنظیم گوش دادن به تغییرات قیمت

        // اگر قیمت وجود دارد، محاسبات را انجامع  بده
        if (this.formSend.value.price) {
          this.calculateFinancials(this.formSend.value.price);
        }
        this.setupPriceCalculation();

      },
      error: (error) => {
        this.notification.error('خطا در بارگذاری داده‌ها');
      }
    });
  }

  setConfigRates() {


    if (this.dataConfig ) {
      this.dataConfig.forEach((config: any) => {
        if (config.key === 'tax') {
          this.taxRate = parseInt(config.value) / 100;
        } else if (config.key === 'profit') {
          this.siteRate = parseInt(config.value) / 100;
        }
      });
    }
  }

  calculateFinancials(price: number) {
    if (!price || price <= 0) {
      this.taxAmount = 0;
      this.siteShare = 0;
      this.netIncome = 0;
      return;
    }

    // محاسبه مالیات
    this.taxAmount = Math.round(price * this.taxRate);

    // محاسبه سهم سایت
    this.siteShare = Math.round(price * this.siteRate);

    // محاسبه خالص دریافتی
    this.netIncome = price - this.taxAmount - this.siteShare;
  }

  checkEditMode() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.courseId = +params['id'];
      }
    });
  }

  loadCourseData() {
    if (this.courseId) {
      this.dataCourse.loading = true;
      return this.courseManagementService.getEvent({ filter: { idList: [this.courseId] } })
        .pipe(
          finalize(() => this.dataCourse.loading = false)
        );
    }
    // بازگرداندن observable خالی
    return of({ data: [] });
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
      startDateTime: courseData.startDateTimeShamsi,
      endDateTime: courseData.endDateTimeShamsi,
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
    this.dataCourse.loading = true;
    return this.courseManagementService.getCourse().pipe(
      finalize(() => this.dataCourse.loading = false)
    );
  }

  getEventType() {
    return this.courseManagementService.getEventType();
  }

  getConfig() {
    return this.courseManagementService.getConfig();
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
    });
  }

  get form() {
    return this.formSend;
  }

  changeStep(type: string) {
    if (type == 'next') {
      if (this.step < 6) {
        this.step = this.step + 1;
      }
    } else {
      if (this.step > 1) {
        this.step = this.step - 1;
      }
    }
  }

  submit() {
    if (this.formSend.invalid) {
      this.notification.error('لطفا تمام فیلدهای обязаاری را پر کنید');
      return;
    }

    this.loadingButton = true;
    let form = this.formSend.value
    form.startDateTime =  this.convertJalaliToGregorian(this.formSend.value?.startDateTime)
    form.endDateTime =  this.convertJalaliToGregorian(this.formSend.value?.endDateTime)
    const submitObservable = this.isEditMode
      ? this.courseManagementService.updateEvent({ dto: { ...form, id: this.courseId } })
      : this.courseManagementService.insertEvent({ dto: form });

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
      this.taxAmount = 0;
      this.siteShare = 0;
      this.netIncome = 0;
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

  priceValue: number = 0;

  setupPriceCalculation() {
    // گوش دادن به تغییرات فیلد قیمت
    this.formSend.get('price')?.valueChanges.subscribe(price => {
      this.priceValue = price || 0;
      this.calculateFinancials(price);
    });
  }

  // متد برای زمانی که کاربر در input تایپ می‌کند
  onPriceInput(event: any) {
    const value = event.target.value.replace(/,/g, '');
    this.formSend.patchValue({ price: value ? parseInt(value) : null });
  }
}
