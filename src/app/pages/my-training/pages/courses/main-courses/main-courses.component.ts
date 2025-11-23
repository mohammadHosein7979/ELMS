import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { BaseService } from "../../../../../shared/services/base.service";
import { CoursesService } from "../services/courses.service";
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-main-courses',
    templateUrl: './main-courses.component.html',
    styleUrls: ['./main-courses.component.scss'],
    standalone: false
})
export class MainCoursesComponent extends BaseService implements OnInit, OnDestroy {
  selectedEventId: number | null = null;
  filteredEvents: any[] = [];
  allEvents: any[] = [];

  private destroy$ = new Subject<void>();
  private dataLoaded = false;

  constructor(injector: Injector, private coursesService: CoursesService) {
    super(injector);
  }

  ngOnInit() {
    this.loadInitialData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialData() {
    // فقط یک بار داده رو بگیر
    this.coursesService.getAllEventList().subscribe((data: any) => {
      this.allEvents = data.data;
      this.dataLoaded = true;

      // بعد از لود داده، فیلترها رو اعمال کن
      this.applyCurrentFilters();

      // حالا به تغییرات گوش بده
      this.setupQueryParamsListener();
    });
  }

  private setupQueryParamsListener() {
    this.route.queryParams
      .pipe(
        debounceTime(50), // تاخیر کوچک
        distinctUntilChanged((prev, curr) => {
          return prev['filter'] === curr['filter'] && prev['eventId'] === curr['eventId'];
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((params: any) => {
        this.handleParamsChange(params);
      });
  }

  private handleParamsChange(params: any) {
    if (this.dataLoaded) {
      this.applyFilters(params);
    }
  }

  private applyCurrentFilters() {
    const currentParams = this.route.snapshot.queryParams;
    this.applyFilters(currentParams);
  }

  private applyFilters(params: any) {
    const filterType = params['filter'];
    const eventId = params['eventId'];
    // فیلتر کردن داده‌ها
    if (filterType) {
      const filterId = parseInt(filterType, 10);
      this.filteredEvents = this.allEvents.filter(event =>
        event.eventTypeId == filterId
      );
    } else {
      this.filteredEvents = [...this.allEvents];
    }

    // تنظیم رویداد انتخاب شده
    this.setSelectedEvent(eventId);
  }

  private setSelectedEvent(eventId?: string) {
    if (eventId) {
      const id = parseInt(eventId, 10);
      // چک کن که eventId در filteredEvents وجود داشته باشد
      const eventExists = this.filteredEvents.some(event => event.id === id);
      this.selectedEventId = eventExists ? id : null;

      // اگر eventId وجود ندارد، اولین رویداد رو انتخاب کن
      if (!eventExists && this.filteredEvents.length > 0) {
        this.selectFirstEvent();
      }
    } else {
      this.selectedEventId = null;
      // اگر eventId نداریم، اولین رویداد رو انتخاب کن
      if (this.filteredEvents.length > 0) {
        this.selectFirstEvent();
      }
    }
  }

  private selectFirstEvent() {
    if (this.filteredEvents.length > 0 && !this.selectedEventId) {
      const firstEventId = this.filteredEvents[0].id;
      this.selectedEventId = firstEventId;

      // فقط اگر eventId در query params نیست، آپدیتش کن
      const currentParams = this.route.snapshot.queryParams;
      if (!currentParams['eventId']) {
        this.updateQueryParams({ eventId: firstEventId });
      }
    }
  }

  changeEvent(item: any) {
    if (item.id !== this.selectedEventId) {
      this.selectedEventId = item.id;
      this.updateQueryParams({ eventId: item.id });
    }
  }

  private updateQueryParams(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  isEventSelected(event: any): boolean {
    return this.selectedEventId === event.id;
  }

  getMasterName(event: any): string {
    if (event.eventMasters?.length > 0) {
      const master = event.eventMasters[0];
      return `${master.person.name} ${master.person.family}`;
    }
    return 'نامشخص';
  }

  getEventClass(event: any): string {
    const baseClasses = 'cursorPointer border-radius-10 p-2 item-courses-4 d-flex w-100 justify-content-between pe-4 mb-3';
    const selectedClass = this.isEventSelected(event) ? 'border-color-10' : '';
    const typeClass = event.type === 1 ? 'item-courses-1' : 'item-courses-3';

    return `${baseClasses} ${selectedClass} ${typeClass}`;
  }
}
