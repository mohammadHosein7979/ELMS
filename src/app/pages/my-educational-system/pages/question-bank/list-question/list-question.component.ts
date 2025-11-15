import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SwiperComponent} from "swiper/angular";
import {BaseService} from "../../../../../shared/services/base.service";
import {QuestionBankService, TypeQuestionBank} from "../services/question-bank.service";
import {LayoutService} from "../../../../../layout/services/layout.service";

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrl: './list-question.component.scss'
})
export class ListQuestionComponent extends BaseService implements OnInit{
  type : any


  constructor(injector:Injector,protected questionBankService:QuestionBankService) {
    super(injector);
  }

  ngOnInit() {
    this.questionReport()

  }

  questionReport(){
    this.questionBankService.questionReport(null).subscribe((data:any)=>{
      this.data = data?.data
    })
  }




  @ViewChild(SwiperComponent) swiper: any;

  protected readonly TypeQuestionBank = TypeQuestionBank;
}
