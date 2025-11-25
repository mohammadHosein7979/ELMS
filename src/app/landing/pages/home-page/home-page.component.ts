import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from "swiper";
import { SwiperHelperService } from "../../../shared/helperService/swiper-helper.service";
import { SwiperComponent } from "swiper/angular";
import { BaseService } from '../../../shared/services/base.service';
import { EducationService } from '../../../pages/education/services/education.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  standalone: false
})
export class HomePageComponent extends BaseService implements OnInit {
  dataPre: any = []
  dataPopularEvents: any = []
  @ViewChild(SwiperComponent) swiperEducationP: any;


  dataEvents: any = []  
  dataCourses: any = []  

  swiperConfig: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    pagination: false,
    autoplay: false,
    loop: false,
    updateOnWindowResize: true,
    breakpoints: {
      279: {
        slidesPerView: 1.3,
        spaceBetween: 24
      },
      768: {
        slidesPerView: 3.3,
        spaceBetween: 24
      },
      1052: {
        slidesPerView: 5.2,
        spaceBetween: 24
      },
      1600: {
        slidesPerView: 5.2,
        spaceBetween: 24
      }
    }
  };
  swiperConfig2: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    pagination: false,
    autoplay: false,
    loop: false,
    updateOnWindowResize: true,
    breakpoints: {
      279: {
        slidesPerView: 1.3,
        spaceBetween: 90
      },
      768: {
        slidesPerView: 3.3,
        spaceBetween: 90
      },
      1052: {
        slidesPerView: 5.2,
        spaceBetween: 90
      },
      1600: {
        slidesPerView: 5.2,
        spaceBetween: 90
      }
    }
  };
  swiperConfig3: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'vertical',
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    pagination: false,
    autoplay: false,
    loop: false,
    freeMode: true,
    watchSlidesProgress: true,
    updateOnWindowResize: true,
    breakpoints: {
      279: {
        slidesPerView: 1,
        spaceBetween: 10

      },
      768: {
        slidesPerView: 1,
        spaceBetween: 10

      },
      1052: {
        slidesPerView: 1,
        spaceBetween: 10

      }
    }
  };



  constructor(injector: Injector, protected educationService: EducationService, private swiperHelperService: SwiperHelperService) {
    super(injector);
  }
  ngOnInit(): void {
    this.getPopularEvents()
        this.getPreEvents()
        this.getCourses()


  }
  getPopularEvents() {
    this.educationService.getEvent(null).subscribe((data: any) => {
      this.dataPopularEvents = data.data
    })
  }
  getEvents(id:number) {
    this.educationService.getEvent({ "filter": { "status": 3 ,"courseIdList":[id]} }).subscribe((data: any) => {
      this.dataEvents = data.data
    })
  }
  getPreEvents() {
    this.educationService.getEvent({ "filter": { "status": 0 } }).subscribe((data: any) => {
      this.dataPre = data.data
    })
  }
    getCourses() {
    this.educationService.getCourse().subscribe((data: any) => {
      this.dataCourses = data.data
    })
  }

  getEventByCourseId(id:number){
    console.log(id)
        this.getEvents(id)

  }
  onSlideChangeEducationP(e: any) {
    let swiperPrev: any;
    let swiperNext: any;
    swiperPrev = document.getElementById('SwiperPrevEducationP')
    swiperNext = document.getElementById('SwiperNextEducationP')

    this.swiperHelperService.swiperOpacity(e, swiperPrev, swiperNext)
  }


  swipePrevEducationP(e: any) {
    e.swiperRef.slidePrev();
  }

  swipeNextEducationP(e: any) {
    e.swiperRef.slideNext();
  }




  onSlideChangeEducation(e: any) {
    let swiperPrev: any;
    let swiperNext: any;
    swiperPrev = document.getElementById('SwiperPrevEducation')
    swiperNext = document.getElementById('SwiperNextEducation')

    this.swiperHelperService.swiperOpacity(e, swiperPrev, swiperNext)
  }


  swipePrevEducation(e: any) {
    e.swiperRef.slidePrev();
  }

  swipeNextEducation(e: any) {
    e.swiperRef.slideNext();
  }



  onSlideChangeRoadMap(e: any) {
    let swiperPrev: any;
    let swiperNext: any;
    swiperPrev = document.getElementById('SwiperPrevRoadMap')
    swiperNext = document.getElementById('SwiperNextRoadMap')

    this.swiperHelperService.swiperOpacity(e, swiperPrev, swiperNext)
  }


  swipePrevRoadMap(e: any) {
    e.swiperRef.slidePrev();
  }

  swipeNextRoadMap(e: any) {
    e.swiperRef.slideNext();
  }


  onSlideChangeGoft(e: any) {
    let swiperPrev: any;
    let swiperNext: any;
    swiperPrev = document.getElementById('SwiperPrevGoft')
    swiperNext = document.getElementById('SwiperNextGoft')

    this.swiperHelperService.swiperOpacity(e, swiperPrev, swiperNext)
  }


  swipePrevGoft(e: any) {
    e.swiperRef.slidePrev();
  }

  swipeNextGoft(e: any) {
    e.swiperRef.slideNext();
  }
}
