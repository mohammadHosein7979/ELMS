import {Component, Input} from '@angular/core';
import {TypeClasses} from "../../pages/my-educational-system/pages/classes/services/classes.service";

@Component({
    selector: 'app-presence-and-absence',
    imports: [],
    templateUrl: './presence-and-absence.component.html',
    styleUrl: './presence-and-absence.component.scss'
})
export class PresenceAndAbsenceComponent {
  @Input('active') active : any = true
}
