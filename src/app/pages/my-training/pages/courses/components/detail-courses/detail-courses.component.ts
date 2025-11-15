import { Component, Injector, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseService } from "../../../../../../shared/services/base.service";
import { CoursesService } from "../../services/courses.service";
import { TypeClasses } from "../../../../../my-educational-system/pages/classes/services/classes.service";

@Component({
    selector: 'app-detail-courses',
    templateUrl: './detail-courses.component.html',
    styleUrls: ['./detail-courses.component.scss'],
    standalone: false
})
export class DetailCoursesComponent extends BaseService implements OnChanges {
  @Input() itemSelect: any;

  override data: any;
  selectedEventMaster: any;
  selectEpisode: any = { id: 1, title: 'فصل اول - مقدمه' };
  isLoading = false;

  constructor(injector: Injector, private coursesService: CoursesService) {
    super(injector);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemSelect'] && changes['itemSelect'].currentValue) {
      this.getEventDetails(changes['itemSelect'].currentValue);
    }
  }

  getEventDetails(eventId: number): void {
    if (!eventId) return;

    this.isLoading = true;

    const body = {
      eventId: +eventId,
    };

    this.coursesService.getEventDetails(body).subscribe({
      next: (data: any) => {
        this.data = data.data;
        this.selectedEventMaster = this.data?.event?.eventMasters?.[0];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading event details:', error);
        this.isLoading = false;
      }
    });
  }

  changeEventMaster(data: any, index: any, type: any): void {
    if (data[index + type]) {
      this.selectedEventMaster = data[index + type];
    } else {
      this.selectedEventMaster = data[0];
    }
  }

  changeEpisode(item: any): void {
    if (this.selectEpisode?.id === item?.id) {
      this.selectEpisode = null;
    } else {
      this.selectEpisode = item;
    }
  }

  protected readonly TypeClasses = TypeClasses;
}
