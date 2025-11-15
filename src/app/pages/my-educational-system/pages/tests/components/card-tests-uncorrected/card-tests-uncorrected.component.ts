import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {EnteringClassComponent} from "../../../../../../components/entering-class/entering-class.component";
import {OnlineClassLinkComponent} from "../../../../../../components/online-class-link/online-class-link.component";
import {
  ClassLinkConnectionComponent
} from "../../../../../../components/class-link-connection/class-link-connection.component";
import {TypeTests} from "../../services/tests.service";
import {LocationComponent} from "../../../../../../components/location/location.component";
import {
  PresenceAndAbsenceComponent
} from "../../../../../../components/presence-and-absence/presence-and-absence.component";
import {NzTimelineComponent, NzTimelineItemComponent} from "ng-zorro-antd/timeline";
import {NzStepComponent, NzStepsComponent} from "ng-zorro-antd/steps";
import {ProgressCircleComponent} from "../../../../../../components/progress-circle/progress-circle.component";

@Component({
    selector: 'app-card-tests-uncorrected',
    templateUrl: './card-tests-uncorrected.component.html',
    styleUrl: './card-tests-uncorrected.component.scss',
    imports: [
        NgIf,
        RouterLink,
        EnteringClassComponent,
        OnlineClassLinkComponent,
        ClassLinkConnectionComponent,
        LocationComponent,
        PresenceAndAbsenceComponent,
        NzTimelineComponent,
        NzTimelineItemComponent,
        NzStepsComponent,
        NzStepComponent,
        ProgressCircleComponent
    ]
})
export class CardTestsUncorrectedComponent {

  @Input('data') data : any

  protected readonly TypeTests = TypeTests;
}
