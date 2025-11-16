import {Component, Input} from '@angular/core';
import {
  PresenceAndAbsenceComponent
} from "../../../../../../components/presence-and-absence/presence-and-absence.component";
import {ProgressCircleComponent} from "../../../../../../components/progress-circle/progress-circle.component";

@Component({
    selector: 'app-card-tests-uncorrected',
    templateUrl: './card-tests-uncorrected.component.html',
    styleUrl: './card-tests-uncorrected.component.scss',
    imports: [
        PresenceAndAbsenceComponent,
        ProgressCircleComponent
    ]
})
export class CardTestsUncorrectedComponent {
  @Input('data') data : any
}
