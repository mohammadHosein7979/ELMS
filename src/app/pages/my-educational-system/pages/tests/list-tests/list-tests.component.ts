import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseService } from '../../../../../shared/services/base.service';
import { CourseManagementService } from '../../course-management/services/course-management.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {TestsService} from "../services/tests.service";

@Component({
  selector: 'app-list-tests',
  templateUrl: './list-tests.component.html',
  styleUrl: './list-tests.component.scss',
  standalone: false
})
export class ListTestsComponent extends BaseService implements OnInit {
  dataCourse: any = [];
  filterForm!: FormGroup;

  statusOptions = [
    { value: true, label: 'فعال' },
    { value: false, label: 'غیرفعال' }
  ];
    descriptiveOptions = [
    { value: true, label: 'تشریحی' },
    { value: false, label: 'تستی' }
  ];

  difficultyOptions = [
    { value: 1, label: 'آسان' },
    { value: 2, label: 'متوسط' },
    { value: 3, label: 'سخت' }
  ];

  constructor(
    injector: Injector,
    private testsService: TestsService,
  ) {
    super(injector);
    this.initForm();
  }

  private initForm() {
    this.filterForm = this.fb.group({
      courseIdList: [[]],
      isActiveList: [[]],
      isDescriptiveList: [[]],
      search: ['']
    });
  }

  ngOnInit() {
    this.subscribeToQueryParams();
    this.examReport();
    this.subscribeToFormChanges();

  }

  private subscribeToQueryParams() {
    this.route.queryParams.subscribe(params => {
      const courseIdList = params['courseIdList'] ? params['courseIdList'].split(',').map(Number) : [];
      const isActiveList = params['isActiveList'] ? params['isActiveList'].split(',').map((v: any) => v === 'true') : [];
      const isDescriptiveList = params['isDescriptiveList'] ? params['isDescriptiveList'].split(',').map((v: any) => v === 'true') : [];
      this.filterForm.patchValue(
        {
          courseIdList,
          isActiveList,
          isDescriptiveList,
          search: params['search'] || ''
        },
        { emitEvent: false }
      );
    });
  }

  private subscribeToFormChanges() {
    const controls = ['courseIdList', 'isActiveList', 'isDescriptiveList'];

    controls.forEach(ctrl => {
      this.filterForm.get(ctrl)?.valueChanges
        .pipe(
          debounceTime(0),
          distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
        )
        .subscribe(() => this.updateUrlAndRefresh());
    });

    this.filterForm.get('search')?.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(() => this.updateUrlAndRefresh());
  }


  updateUrlAndRefresh() {
    const v = this.filterForm.value;

    const queryParams: any = {
      courseIdList: v.courseIdList.length ? v.courseIdList.join(',') : undefined,
      isActiveList: v.isActiveList.length ? v.isActiveList.join(',') : undefined,
      isDescriptiveList: v.isDescriptiveList.length ? v.isDescriptiveList.join(',') : undefined,
      search: v.search || undefined
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });

    this.examReport();
  }

  examReport() {
    const f = this.filterForm.value;

    const filterParams: any = { filter: {} };

    if (f.courseIdList.length) {
      filterParams.filter.courseIdList = f.courseIdList;
    }

    if (f.isActiveList.length === 1) {
      filterParams.filter.isActive = f.isActiveList[0];
    }
    if (f.isDescriptiveList.length === 1) {
      filterParams.filter.isDescriptive = f.isDescriptiveList[0];
    }



    if (f.search) {
      filterParams.filter.titleList = [f.search];
    }

    this.testsService.examReport(filterParams).subscribe((data: any) => {
      this.data = data?.data;
    });
  }


  clearAllFilters() {
    this.filterForm.patchValue({
      courseIdList: [],
      isActiveList: [],
      isDescriptiveList: [],
      search: ''
    });
  }
}
