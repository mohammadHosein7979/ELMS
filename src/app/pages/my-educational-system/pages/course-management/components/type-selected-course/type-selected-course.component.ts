import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-type-selected-course',
  templateUrl: './type-selected-course.component.html',
  styleUrl: './type-selected-course.component.scss',
  standalone: true,
  imports: [
    NgIf,
  ]
})
export class TypeSelectedCourseComponent {

  @Input('type') type : any

}
