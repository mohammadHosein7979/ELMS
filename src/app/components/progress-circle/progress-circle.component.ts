import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-progress-circle',
    imports: [],
    templateUrl: './progress-circle.component.html',
    styleUrl: './progress-circle.component.scss'
})
export class ProgressCircleComponent implements OnInit,AfterViewInit{
  @Input('active') active : any = true
  @Input('text') text : any ;
  @Input('width') width : any =30;
  @Input('font') font : any =12;
  @Input('value') value : any =15;
  @Input('bgColorDiv') bgColorDiv : any ='bg-white';
  bgSelected : any

  ngAfterViewInit() {
    if (this.value < 25){
      this.bgSelected = '77D99E'
    }else if(this.value >=25 && this.value <=50){
      this.bgSelected = '51C2FF'

    }else if(this.value >=50 && this.value <=75){
      this.bgSelected = '51C2dd'

    }else {
      this.bgSelected = 'b41b1b'

    }
  }


  ngOnInit() {
    if (this.value < 25){
      this.bgSelected = '77D99E'
    }else if(this.value >=25 && this.value <=50){
      this.bgSelected = '51C2FF'

    }else if(this.value >=50 && this.value <=75){
      this.bgSelected = '51C2dd'

    }else {
      this.bgSelected = 'b41b1b'

    }
  }

}
