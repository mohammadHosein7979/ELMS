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

@Component({
    selector: 'app-card-tests-completed',
    templateUrl: './card-tests-completed.component.html',
    styleUrl: './card-tests-completed.component.scss',
    imports: [
        NgIf,
        RouterLink,
        EnteringClassComponent,
        OnlineClassLinkComponent,
        ClassLinkConnectionComponent,
        LocationComponent
    ]
})
export class CardTestsCompletedComponent {

  @Input('data') data : any

  protected readonly TypeTests = TypeTests;
}
