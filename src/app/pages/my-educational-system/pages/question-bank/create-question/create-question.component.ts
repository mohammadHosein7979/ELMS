import { Component } from '@angular/core';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.scss'
})
export class CreateQuestionComponent {
  constructor() {
    this.filteredOptions = this.options;
  }
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
      if (this.step < 5){
        this.step = this.step + 1
      }
    }else {
      if (this.step > 1){
        this.step = this.step - 1
      }
    }

  }





}
