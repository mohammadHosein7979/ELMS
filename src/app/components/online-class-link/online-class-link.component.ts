import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-online-class-link',
  standalone: true,
  imports: [],
  templateUrl: './online-class-link.component.html',
  styleUrl: './online-class-link.component.scss'
})
export class OnlineClassLinkComponent {
  @Input('link') link : any
}
