import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-status-record',
  standalone: true,
  imports: [],
  templateUrl: './status-record.component.html',
  styleUrl: './status-record.component.scss'
})
export class StatusRecordComponent {
  @Input('status') status : any = false
}
