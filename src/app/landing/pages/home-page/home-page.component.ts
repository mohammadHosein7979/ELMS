import {Component, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {SwiperOptions} from "swiper";
import {SwiperHelperService} from "../../../shared/helperService/swiper-helper.service";
import {SwiperComponent} from "swiper/angular";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    standalone: false
})
export class HomePageComponent   {
  dataPre:any = [
    {
      cover  : 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      ostadImage :['assets/image/remove/Frame63.png','assets/image/remove/Frame29.png'],
      title : 'تدبری در زیارت عاشورا',
      time : '20:10:00',
      type : 'دوره آنلاین'
    },
    {
      cover  : 'assets/image/remove/Frame63.png',
      ostadImage :['assets/image/remove/Frame63.png','assets/image/remove/Frame29.png'],
      title : 'کربلا  در تاریخ',
      time : '21:30:10',
      type : 'دوره ضبط شده'
    },
    {
      cover  : 'assets/image/remove/Frame63.png',
      ostadImage :['assets/image/remove/Frame63.png','assets/image/remove/Frame29.png'],
      title : 'کربلا  در   تاریخ',
      time : '21:30:11',
      type : 'دوره   ضبط شده'
    },
  ]
  @ViewChild(SwiperComponent) swiperEducationP: any;

  dataEducation:any = [
    {
      cover  : 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      title : 'تاریخ بعثت',
      description : 'همیشه در طول تاریخ حلقه های گمشده ای وجود داشته ',
      count : '100 آموزش',
      nafar : '3/4(1K)',
      status : '0',
      type : '0',
      time : '100 ساعت',
      orginalPrice : '1,500,000',
      price : '500,000',
    },
    {
      cover  : 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      title : 'تاریخ بعثت',
      description : 'همیشه در طول تاریخ حلقه های گمشده ای وجود داشته ',
      count : '100 آموزش',
      nafar : '3/4(1K)',
      status : '1',
      date : '1403/10/10',
      type : '1',
      time : '100 ساعت',
      orginalPrice : '1,500,000',
      price : '500,000',
    },
    {
      cover  : 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      title : 'تاریخ بعثت',
      description : 'همیشه در طول تاریخ حلقه های گمشده ای وجود داشته ',
      count : '100 آموزش',
      nafar : '3/4(1K)',
      status : '1',
      date : '1403/10/10',
      type : '2',
      time : '100 ساعت',
      orginalPrice : '1,500,000',
      price : '500,000',
    },
    {
      cover  : 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      title : 'تاریخ بعثت',
      description : 'همیشه در طول تاریخ حلقه های گمشده ای وجود داشته ',
      count : '100 آموزش',
      nafar : '3/4(1K)',
      status : '2',
      type : '0',
      time : '100 ساعت',
      orginalPrice : '1,500,000',
      price : '500,000',
    },
    {
      cover  : 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      title : 'تاریخ بعثت',
      description : 'همیشه در طول تاریخ حلقه های گمشده ای وجود داشته ',
      count : '100 آموزش',
      nafar : '3/4(1K)',
      status : '2',
      date : '1403/10/10',
      type : '1',
      time : '100 ساعت',
      orginalPrice : '1,500,000',
      price : '500,000',
    },
    {
      cover  : 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      title : 'تاریخ بعثت',
      description : 'همیشه در طول تاریخ حلقه های گمشده ای وجود داشته ',
      count : '100 آموزش',
      nafar : '3/4(1K)',
      status : '1',
      date : '1403/10/10',
      type : '0',
      time : '100 ساعت',
      orginalPrice : '1,500,000',
      price : '500,000',
    },
  ]

  swiperConfig: SwiperOptions = {
    a11y: {enabled: true},
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
        spaceBetween : 24
      },
      768: {
        slidesPerView: 3.3,
        spaceBetween : 24
      },
      1052: {
        slidesPerView: 5.2,
        spaceBetween : 24
      },
      1600: {
        slidesPerView: 5.2,
        spaceBetween : 24
      }
    }
  };
  swiperConfig2: SwiperOptions = {
    a11y: {enabled: true},
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
        spaceBetween : 90
      },
      768: {
        slidesPerView: 3.3,
        spaceBetween : 90
      },
      1052: {
        slidesPerView: 5.2,
        spaceBetween : 90
      },
      1600: {
        slidesPerView: 5.2,
        spaceBetween : 90
      }
    }
  };
  swiperConfig3: SwiperOptions = {
    a11y: {enabled: true},
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

  constructor(private swiperHelperService: SwiperHelperService) {
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
