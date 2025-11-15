import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SwiperComponent} from "swiper/angular";
import {BaseService, microService} from "../../../../../shared/services/base.service";
import {TypeQuestionBank} from "../services/question-bank.service";
import {LayoutService} from "../../../../../layout/services/layout.service";

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrl: './list-question.component.scss'
})
export class ListQuestionComponent extends BaseService implements OnInit{
  type : any


  constructor(injector:Injector,protected layoutService:LayoutService) {
    super(injector);
  }

  ngOnInit() {
    this.post(`/${microService.course}/Question/Report`,null).subscribe((data:any)=>{
      this.data = data?.data
    })
  }




  @ViewChild(SwiperComponent) swiper: any;

  protected readonly TypeQuestionBank = TypeQuestionBank;
}
