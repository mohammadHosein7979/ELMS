import {Component, Input} from '@angular/core';
import {TypeClasses} from "../../pages/my-educational-system/pages/classes/services/classes.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-presence-and-absence',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './presence-and-absence.component.html',
  styleUrl: './presence-and-absence.component.scss'
})
export class PresenceAndAbsenceComponent {
  @Input('active') active : any = true

  protected readonly TypeClasses = TypeClasses;
}
