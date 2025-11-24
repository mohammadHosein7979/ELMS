import {Component, Input} from '@angular/core';
import {LocationComponent} from "../../../../../../components/location/location.component";

@Component({
  selector: 'app-card-tests-not-held',
  templateUrl: './card-tests-not-held.component.html',
  styleUrl: './card-tests-not-held.component.scss',
  standalone: true,
  imports: [

    LocationComponent
  ]
})
export class CardTestsNotHeldComponent {

  @Input('data') data : any

}
