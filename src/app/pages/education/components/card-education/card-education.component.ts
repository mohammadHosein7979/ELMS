import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {EnumEducationStatus, EnumEducationType} from "../../../../shared/enum/enum";

@Component({
    selector: 'app-card-education',
    templateUrl: './card-education.component.html',
    styleUrl: './card-education.component.scss',
    imports: [
        NgIf,
        RouterLink
    ]
})
export class CardEducationComponent {

  @Input('data') data : any

  protected readonly EnumEducationStatus = EnumEducationStatus;
  protected readonly EnumEducationType = EnumEducationType;
}
