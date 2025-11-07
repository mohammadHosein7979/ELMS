import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {EnteringClassComponent} from "../../../../../../components/entering-class/entering-class.component";
import {OnlineClassLinkComponent} from "../../../../../../components/online-class-link/online-class-link.component";
import {
  ClassLinkConnectionComponent
} from "../../../../../../components/class-link-connection/class-link-connection.component";
import {TypeClasses} from "../../services/classes.service";
import {LocationComponent} from "../../../../../../components/location/location.component";
import {
  PresenceAndAbsenceComponent
} from "../../../../../../components/presence-and-absence/presence-and-absence.component";

@Component({
  selector: 'app-card-classes',
  templateUrl: './card-classes.component.html',
  styleUrl: './card-classes.component.scss',
  imports: [
    NgIf,
    RouterLink,
    EnteringClassComponent,
    OnlineClassLinkComponent,
    ClassLinkConnectionComponent,
    LocationComponent,
    PresenceAndAbsenceComponent
  ],
  standalone: true
})
export class CardClassesComponent {

  @Input('data') data : any

  protected readonly TypeClasses = TypeClasses;
}
