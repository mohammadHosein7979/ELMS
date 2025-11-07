import {Component, Injector, OnInit} from '@angular/core';
import {SwiperOptions} from "swiper";
import {BaseService} from "../../../../../../shared/services/base.service";
import {CoursesService} from "../../services/courses.service";

@Component({
  selector: 'app-filter-courses',
  templateUrl: './filter-courses.component.html',
  styleUrl: './filter-courses.component.scss'
})
export class FilterCoursesComponent extends BaseService implements OnInit{
  swiperConfig: SwiperOptions = {
    a11y: {enabled: true},
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
  selectedItem:any= {id : 0 , name : 'همه'}

  constructor(injector:Injector,private coursesService:CoursesService) {
    super(injector);
  }
  ngOnInit() {
    this.getData()
  }

  getData(){
    this.coursesService.getAllEventType().subscribe((data:any)=>{
      this.data = data.data
      this.data.unshift(this.selectedItem)
      this.route.queryParams.subscribe((queryParam: any) => {
        if (queryParam.filter){
          this.selectedItem = this.data.find((i:any)=>i.id == this.route.snapshot.queryParams['filter'])
        }else {
          this.selectedItem = this.data[0]
        }
      })

      // if (this.eventListData.length > 0) {
      //   this.itemSelect = this.eventListData[0];
      // }
    })

  }

  changeEventType(item:any){
    this.selectedItem = item
    if (item.id == 0){
      this.router.navigate(['/panel/my-training/courses'],{
        // relativeTo: this.route,
        queryParams: { filter: null },
        // queryParamsHandling: 'merge'
      })
    }else {
      this.router.navigate(['/panel/my-training/courses'],{
        // relativeTo: this.route,
        queryParams: { filter: item.id },
        // queryParamsHandling: 'merge'
      })
    }

  }
}
