import {Component, Injector, OnInit} from '@angular/core';
import {BaseService} from "../../../../../shared/services/base.service";
import {CourseManagementService} from "../services/course-management.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MicroService} from '../../../../../shared/enum/enum';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  standalone: false,
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent extends BaseService implements OnInit {

  filterForm!: FormGroup;
  protected readonly MicroService = MicroService;

  constructor(
    injector: Injector,
    protected courseManagementService: CourseManagementService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.createFilterForm();
    this.loadData();
  }

  createFilterForm() {
    this.filterForm = this.fb.group({
      title: [''],
      status: [''],
      level: [''],
      search: ['']
    });
  }

  loadData(params: any = {}) {
    params.personID = this.personId;

    this.courseManagementService.getEventMaster(params).subscribe((res: any) => {
      this.data = res.data;
    });
  }

  applyFilter() {
    const params = this.filterForm.value;

    // قرار دادن پارامترها در URL
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });

    // صدا زدن API با فیلترها
    this.loadData(params);
  }
}
