import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-item-courses',
  templateUrl: './item-courses.component.html',
  styleUrl: './item-courses.component.scss'
})
export class ItemCoursesComponent {
  @Input('data') data : any
  @Input('itemSelect') itemSelect : any

}
