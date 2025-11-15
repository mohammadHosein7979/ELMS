import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-location',
    imports: [],
    templateUrl: './location.component.html',
    styleUrl: './location.component.scss'
})
export class LocationComponent {
  @Input('data') data : any

}
