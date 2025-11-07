import {Component, Input} from '@angular/core';
import {NzAvatarComponent, NzAvatarGroupComponent} from "ng-zorro-antd/avatar";

@Component({
  selector: 'app-card-pre-production-education',
  templateUrl: './card-pre-production-education.component.html',
  styleUrl: './card-pre-production-education.component.scss',
  imports: [
    NzAvatarGroupComponent,
    NzAvatarComponent
  ],
  standalone: true
})
export class CardPreProductionEducationComponent {

  @Input('data') data : any

}
