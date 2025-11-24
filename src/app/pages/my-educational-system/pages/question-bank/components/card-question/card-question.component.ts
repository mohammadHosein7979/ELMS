import {Component, Input} from '@angular/core';
import {ProgressCircleComponent} from "../../../../../../components/progress-circle/progress-circle.component";
import {BaseService} from "../../../../../../shared/services/base.service";
import {MicroService} from "../../../../../../shared/enum/enum";

@Component({
  selector: 'app-card-question',
  templateUrl: './card-question.component.html',
  styleUrl: './card-question.component.scss',
  standalone: true,
  imports: [
    ProgressCircleComponent
  ]
})
export class CardQuestionComponent extends BaseService{

  @Input('data') override data : any
  @Input('dataAll')  dataAll : any
  @Input('id') id : any
  editQuestion(questionId: number) {
    const route = `/panel/my-educational-system/question-bank/edit/${questionId}`;
    this.router.navigate([route]);

    // اگر نیاز دارید route map را هم آپدیت کنید
    // this.layoutService.changeRoutMap(route);
  }

  protected readonly MicroService = MicroService;
}
