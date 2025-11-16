import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-card-tests-completed',
    templateUrl: './card-tests-completed.component.html',
    styleUrl: './card-tests-completed.component.scss',
    imports: [

    ]
})
export class CardTestsCompletedComponent {
  @Input('data') data : any
}
