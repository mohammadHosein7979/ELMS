import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { SwiperOptions } from "swiper";
import { BaseService } from "../../../../../../shared/services/base.service";
import { CoursesService } from "../../services/courses.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-filter-courses',
  templateUrl: './filter-courses.component.html',
  styleUrls: ['./filter-courses.component.scss']
})
export class FilterCoursesComponent extends BaseService implements OnInit, OnDestroy {
  swiperConfig: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: false,
    autoplay: false,
    loop: false,
    updateOnWindowResize: true,
  };

  override data: any[] = [];
  selectedItem: any = { id: 0, name: 'همه' };

  private destroy$ = new Subject<void>();

  constructor(injector: Injector, private coursesService: CoursesService) {
    super(injector);
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getData() {
    this.coursesService.getAllEventType().subscribe((data: any) => {
      this.data = data.data;
      this.data.unshift(this.selectedItem);

      // فقط یک بار query params رو چک کن
      this.checkInitialFilter();
    });
  }

  private checkInitialFilter() {
    const currentParams = this.route.snapshot.queryParams;
    if (currentParams['filter']) {
      const filterId = parseInt(currentParams['filter'], 10);
      this.selectedItem = this.data.find((i: any) => i.id == filterId) || this.data[0];
    } else {
      this.selectedItem = this.data[0];
    }
  }

  changeEventType(item: any) {
    this.selectedItem = item;

    if (item.id == 0) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { filter: null, eventId: null }, // eventId رو هم پاک کن
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { filter: item.id, eventId: null }, // eventId رو پاک کن تا از اول انتخاب بشه
        queryParamsHandling: 'merge'
      });
    }
  }
}
