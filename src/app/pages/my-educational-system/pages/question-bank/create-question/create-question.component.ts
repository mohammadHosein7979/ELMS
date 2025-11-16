import {Component, Injector, OnInit} from '@angular/core';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CourseManagementService} from "../../course-management/services/course-management.service";
import {BaseService} from "../../../../../shared/services/base.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuestionBankService} from "../services/question-bank.service";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.scss',
  standalone: false
})
export class CreateQuestionComponent extends BaseService implements OnInit {

  constructor(
    injector: Injector,
    private courseManagementService: CourseManagementService,
    private questionBankService: QuestionBankService,
  ) {
    super(injector)
  }
  public Editor = ClassicEditor;
  public config = {
    language: {
      ui: 'fa',
      content: 'ar'
    }
  }
  formSend!: FormGroup
  step: any = 1
  dataCourse: any = {
    data: [],
    loading: false
  }

  isEditMode = false; // حالت ویرایش
  editQuestionId: number | null = null; // ID سوال در حال ویرایش

  ngOnInit() {
    this.createForm();
    this.getCourse();
    this.checkEditMode();
  }

  // چک کردن آیا در حالت ویرایش هستیم
  checkEditMode() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.editQuestionId = +params['id'];
        this.loadQuestionData(this.editQuestionId);
      }
    });
  }

  // لود کردن داده‌های سوال برای ویرایش
  loadQuestionData(questionId: number) {
    this.questionBankService.getQuestionById({filter : {
        idList:[questionId]
      }}).subscribe({
      next: (questionData: any) => {
        console.log(questionData);
        if (questionData?.data && questionData.data?.length > 0) {
          this.populateForm(questionData.data[0]);

        }
      },
      error: (error) => {
        console.error('Error loading question data:', error);
        this.notification.error('خطا در بارگذاری داده‌های سوال');
      }
    });
  }

  // پر کردن فرم با داده‌های سوال
  populateForm(questionData: any) {
    // پاک کردن پاسخ‌های موجود
    while (this.answers.length !== 0) {
      this.answers.removeAt(0);
    }

    // پر کردن فرم با داده‌های سوال
    this.formSend.patchValue({
      courseId: questionData.courseId,
      isDescriptive: questionData.isDescriptive,
      answerCount: questionData.answerCount,
      difficulty: questionData.difficulty,
      title: questionData.title
    });

    // اضافه کردن پاسخ‌ها
    if (questionData.answers && questionData.answers.length > 0) {
      questionData.answers.forEach((answer: any) => {
        this.answers.push(this.fb.group({
          title: [answer.title, Validators.required],
          isCorect: [answer.isCorect]
        }));
      });
    }
  }

  createForm() {
    this.formSend = this.fb.group({
      courseId: [null, Validators.required],
      isDescriptive: [false, Validators.required],
      answerCount: [4, [Validators.required, Validators.min(2), Validators.max(6)]],
      difficulty: [2, Validators.required],
      score: [4],
      title: ['', Validators.required],
      answers: this.fb.array([
        this.createAnswer(),
        this.createAnswer(),
        this.createAnswer(),
        this.createAnswer()
      ])
    });
  }

  createAnswer(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      isCorect: [false]
    });
  }

  get answers(): FormArray {
    return this.formSend.get('answers') as FormArray;
  }

  getCourse() {
    this.dataCourse.loading = true;
    this.courseManagementService.getCourse().subscribe((data: any) => {
      this.dataCourse.data = data.data;
      this.dataCourse.loading = false;
    });
  }



  changeStep(type: string) {
    if (type == 'next') {
      if (this.step < 5) {
        this.step = this.step + 1;
      }
    } else {
      if (this.step > 1) {
        this.step = this.step - 1;
      }
    }
  }

  setCorrect(index: number) {
    this.answers.controls.forEach((ctrl, i) => {
      ctrl.get('isCorect')?.setValue(i === index);
    });
  }

  getTitleControl(answer: any): FormControl {
    return answer.get('title') as FormControl;
  }

  onsubmit() {
    if (this.formSend.invalid) {
      this.notification.error('لطفا تمام فیلدهای ضروری را پر کنید');
      return;
    }

    if (this.isEditMode && this.editQuestionId) {
      this.formSend.value.id = this.editQuestionId;
      // حالت ویرایش - ارسال درخواست آپدیت
      this.questionBankService.updateQuestion( {dto:this.formSend.value , id : this.editQuestionId}).subscribe({
        next: () => {
          this.notification.success('سوال با موفقیت ویرایش شد');
          this.router.navigate(['/panel/my-educational-system/question-bank/list']);
        },
        error: (error:any) => {
          console.error('Error updating question:', error);
          this.notification.error('خطا در ویرایش سوال');
        }
      });
    } else {
      // حالت ایجاد جدید
      this.questionBankService.insertQuestion({dto:this.formSend.value}).subscribe({
        next: () => {
          this.notification.success('سوال با موفقیت ایجاد شد');
          this.router.navigate(['/panel/my-educational-system/question-bank/list']);
        },
        error: (error) => {
          console.error('Error creating question:', error);
          this.notification.error('خطا در ایجاد سوال');
        }
      });
    }
  }

  // اضافه کردن متد برای ریست فرم
  resetForm() {
    this.formSend.reset();
    // پاک کردن پاسخ‌ها
    while (this.answers.length !== 0) {
      this.answers.removeAt(0);
    }
    // اضافه کردن ۴ پاسخ خالی
    for (let i = 0; i < 4; i++) {
      this.answers.push(this.createAnswer());
    }
    this.step = 1;
    this.isEditMode = false;
    this.editQuestionId = null;
  }
}
