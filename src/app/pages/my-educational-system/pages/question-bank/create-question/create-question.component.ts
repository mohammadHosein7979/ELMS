import {Component, Injector, OnInit} from '@angular/core';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "@ckeditor/ckeditor5-build-classic";
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
export class CreateQuestionComponent extends BaseService implements OnInit{
  constructor(injector: Injector, private courseManagementService: CourseManagementService, private questionBankService: QuestionBankService) {
    super(injector)
  }
  formSend!:FormGroup
  step : any = 1
  dataCourse: any = {
    data: [],
    loading: false
  }

  listAnswer:any = [
    {id: 1, answerTrue: false},
    {id: 2, answerTrue: true},
    {id: 3, answerTrue: false},
    {id: 4, answerTrue: false},
  ]
  ngOnInit() {
    this.createForm()
    this.getCourse()
  }

  createForm() {
    this.formSend = this.fb.group({
      courseId: [null],
      isDescriptive: [null],
      answerCount: [null],
      difficulty: [null],
      answers: this.fb.array([   // اینجا فرم آرایه تعریف می‌کنیم
        this.createAnswer(),     // پاسخ ۱
        this.createAnswer(),     // پاسخ ۲
        this.createAnswer(),     // پاسخ ۳
        this.createAnswer()      // پاسخ ۴
      ])
    });
  }
  createAnswer(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      isCorect: [false]
    });
  }

// برای دسترسی راحت به FormArray
  get answers(): FormArray {
    return this.formSend.get('answers') as FormArray;
  }

  getCourse() {
    this.dataCourse.loading = true
    this.courseManagementService.getCourse().subscribe((data: any) => {
      this.dataCourse.data = data.data;
      this.dataCourse.loading = false

    })
  }


  public Editor = ClassicEditor
  public config = {
    language: {
      ui: 'fa',
      content: 'ar'
    }
  }

  inputValue?: string;
  filteredOptions: string[] = [];
  options = ['تدبری در زندگی', 'تدبری در قرآن', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا'];

  onChangeStepOne(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  // changeAnswerTrue(item:any){
  //   this.listAnswer.map((value:any)=>{
  //     value.answerTrue = value.id == item.id;
  //   })
  // }

  changeStep(type:string){

    if (type == 'next'){
      if (this.step < 5){
        this.step = this.step + 1
      }
    }else {
      if (this.step > 1){
        this.step = this.step - 1
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

  onsubmit(){
    this.questionBankService.insertQuestion(this.formSend.value).subscribe(()=>{
    })
  }
}
