import {Component, Injector, OnInit} from '@angular/core';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "@ckeditor/ckeditor5-build-classic";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BaseService} from "../../../../../shared/services/base.service";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export class CreateCourseComponent extends BaseService implements OnInit{
  constructor(injector:Injector) {
    super(injector)
    this.filteredOptions = this.options;
  }
  formSend !: FormGroup
  step : any = 1
  listAnswer:any = [
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
  inputValue?: string;
  filteredOptions: string[] = [];
  options = ['تدبری در زندگی', 'تدبری در قرآن', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا', 'تدبری در زیارت عاشورا'];



  ngOnInit() {
    this.createForm()
  }
  createForm(){
    this.formSend = this.fb.group({
      type: [1],
    });
  }
  changeType(value:any){
    this.form.patchValue({
      type : value
    })
  }
  get form() {
    return this.formSend;
  }


  onChangeStepOne(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  changeAnswerTrue(item:any){
    this.listAnswer.map((value:any)=>{
      value.answerTrue = value.id == item.id;
    })
  }

  changeStep(type:string){

    if (type == 'next'){
      if (this.step < 7){
        this.step = this.step + 1
      }
    }else {
      if (this.step > 1){
        this.step = this.step - 1
      }
    }

  }





}
