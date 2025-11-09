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

@Component({
  selector: 'app-type-selected-course',
  templateUrl: './type-selected-course.component.html',
  styleUrl: './type-selected-course.component.scss',
  imports: [
    NgIf,

  ],
  standalone: true
})
export class TypeSelectedCourseComponent {

  @Input('type') type : any

}
