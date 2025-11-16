import {Component, Injector, OnInit} from '@angular/core';
import {BaseService} from "../../../../../shared/services/base.service";
import {RecordsService} from "../services/records.service";

@Component({
    selector: 'app-main-records',
    templateUrl: './main-records.component.html',
    styleUrl: './main-records.component.scss',
    standalone: false
})
export class MainRecordsComponent extends BaseService implements OnInit{
  constructor(injector:Injector,private recordsService:RecordsService) {
    super(injector);
  }

  ngOnInit() {
    this.getData()

  }
  getData(){
    this.recordsService.getAllRecords().subscribe((data:any)=>{
      this.data = data.data
    })

  }

}
