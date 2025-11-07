import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {EnteringClassComponent} from "../../../../../../components/entering-class/entering-class.component";
import {OnlineClassLinkComponent} from "../../../../../../components/online-class-link/online-class-link.component";
import {
  ClassLinkConnectionComponent
} from "../../../../../../components/class-link-connection/class-link-connection.component";
import {LocationComponent} from "../../../../../../components/location/location.component";
import {
  PresenceAndAbsenceComponent
} from "../../../../../../components/presence-and-absence/presence-and-absence.component";
import {TypeQuestionBank} from "../../services/question-bank.service";
import {ProgressCircleComponent} from "../../../../../../components/progress-circle/progress-circle.component";

@Component({
  selector: 'app-card-question',
  templateUrl: './card-question.component.html',
  styleUrl: './card-question.component.scss',
  imports: [
    NgIf,
    RouterLink,
    EnteringClassComponent,
    OnlineClassLinkComponent,
    ClassLinkConnectionComponent,
    LocationComponent,
    PresenceAndAbsenceComponent,
    ProgressCircleComponent
  ],
  standalone: true
})
export class CardQuestionComponent {

  @Input('data') data : any
  @Input('id') id : any

  protected readonly TypeQuestion = TypeQuestionBank;
}
