import {Component, OnInit} from '@angular/core';
import SwiperCore, {Navigation, Thumbs} from "swiper";
import { SwiperOptions} from "swiper";
import {SwiperModule} from "swiper/angular";
import {CommonModule} from "@angular/common";
SwiperCore.use([Navigation, Thumbs]);

@Component({
  selector: 'app-slider-education',
  templateUrl: './slider-education.component.html',
  styleUrl: './slider-education.component.scss',
  imports: [
    SwiperModule,
    CommonModule
  ],
  standalone: true
})
export class SliderEducationComponent implements OnInit{
  thumbsSwiper: any;
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
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1052: {
        slidesPerView: 1,
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
        slidesPerView: 1.1,
        spaceBetween : 10
      },
      768: {
        slidesPerView: 2.1,
        spaceBetween : 10
      },
      1052: {
        slidesPerView: 3.1,
        spaceBetween : 10
      }
    }
  };
  data:any

  dd(e:any){
    // if (e[0]){
    //   this.thumbsSwiper= e[0]
    // }
    // this.thumbsSwiper = e
  }

  ngOnInit() {
    this.data = [
      {
        image:'assets/image/remove/photo16049609141.jpg',
        title : 'اسلام و دوران شاه عباس صفوی'

      },
      {
        image:'assets/image/remove/Frame63.png',
        title : 'اسلام و دوران شاه عباس صفوی'

      },

      {
        image:'assets/image/remove/Frame61.png',
        title : 'اسلام و دوران شاه عباس صفوی'

      },
    ]

  }


}
