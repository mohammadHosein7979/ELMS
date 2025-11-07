import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-entering-class',
  standalone: true,
  imports: [],
  templateUrl: './entering-class.component.html',
  styleUrl: './entering-class.component.scss'
})
export class EnteringClassComponent {
  @Input('active') active : any = true
  @Input('link') link : any
}
