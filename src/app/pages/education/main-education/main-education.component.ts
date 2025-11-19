import { Component, Injector, OnInit } from '@angular/core';
import { SwiperOptions } from "swiper";
import { BaseService } from '../../../shared/services/base.service';
import { EducationService } from '../services/education.service';

@Component({
  selector: 'app-main-education',
  templateUrl: './main-education.component.html',
  styleUrl: './main-education.component.scss',
  standalone: false
})
export class MainEducationComponent extends BaseService implements OnInit {

  constructor(injector: Injector, protected educationService: EducationService) {
    super(injector);
  }

  dataPre: any = [
    {
      cover: 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      ostadImage: ['assets/image/remove/Frame63.png', 'assets/image/remove/Frame63.png'],
      title: 'تدبری در زیارت عاشورا',
      time: '20:10:00',
      type: 'دوره آنلاین'
    },
    {
      cover: 'assets/image/remove/Frame63.png',
      ostadImage: ['assets/image/remove/Frame63.png', 'assets/image/remove/Frame63.png'],
      title: 'کربلا  در تاریخ',
      time: '21:30:10',
      type: 'دوره ضبط شده'
    },
    {
      cover: 'assets/image/remove/Frame63.png',
      ostadImage: ['assets/image/remove/Frame63.png', 'assets/image/remove/Frame63.png'],
      title: 'کربلا  در تاریخ',
      time: '21:30:10',
      type: 'دوره ضبط شده'
    },
    {
      cover: 'assets/image/remove/Frame63.png',
      ostadImage: ['assets/image/remove/Frame63.png', 'assets/image/remove/Frame63.png'],
      title: 'کربلا  در تاریخ',
      time: '21:30:10',
      type: 'دوره ضبط شده'
    },
    {
      cover: 'assets/image/remove/Frame63.png',
      ostadImage: ['assets/image/remove/Frame63.png', 'assets/image/remove/Frame63.png'],
      title: 'کربلا  در تاریخ',
      time: '21:30:10',
      type: 'دوره ضبط شده'
    },
    {
      cover: 'assets/image/remove/Frame63.png',
      ostadImage: ['assets/image/remove/Frame63.png', 'assets/image/remove/Frame63.png'],
      title: 'کربلا  در تاریخ',
      time: '21:30:10',
      type: 'دوره ضبط شده'
    },
  ]
  dataEducation: any = [
    {
      cover: 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      title: 'تاریخ بعثت',
      description: 'همیشه در طول تاریخ حلقه های گمشده ای وجود داشته ',
      count: '100 آموزش',
      nafar: '3/4(1K)',
      status: '0',
      type: '0',
      time: '100 ساعت',
      orginalPrice: '1,500,000',
      price: '500,000',
    },
    {
      cover: 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      title: 'تاریخ بعثت',
      description: 'همیشه در طول تاریخ حلقه های گمشده ای وجود داشته ',
      count: '100 آموزش',
      nafar: '3/4(1K)',
      status: '1',
      date: '1403/10/10',
      type: '1',
      time: '100 ساعت',
      orginalPrice: '1,500,000',
      price: '500,000',
    },
    {
      cover: 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      title: 'تاریخ بعثت',
      description: 'همیشه در طول تاریخ حلقه های گمشده ای وجود داشته ',
      count: '100 آموزش',
      nafar: '3/4(1K)',
      status: '1',
      date: '1403/10/10',
      type: '2',
      time: '100 ساعت',
      orginalPrice: '1,500,000',
      price: '500,000',
    },
    {
      cover: 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      title: 'تاریخ بعثت',
      description: 'همیشه در طول تاریخ حلقه های گمشده ای وجود داشته ',
      count: '100 آموزش',
      nafar: '3/4(1K)',
      status: '2',
      type: '0',
      time: '100 ساعت',
      orginalPrice: '1,500,000',
      price: '500,000',
    },
    {
      cover: 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      title: 'تاریخ بعثت',
      description: 'همیشه در طول تاریخ حلقه های گمشده ای وجود داشته ',
      count: '100 آموزش',
      nafar: '3/4(1K)',
      status: '2',
      date: '1403/10/10',
      type: '1',
      time: '100 ساعت',
      orginalPrice: '1,500,000',
      price: '500,000',
    },
    {
      cover: 'assets/image/remove/1WJ7bUXuAtcTS9TWQsNTBAa7EqUtNYz7weUVjiTq_thumb.jfif',
      title: 'تاریخ بعثت',
      description: 'همیشه در طول تاریخ حلقه های گمشده ای وجود داشته ',
      count: '100 آموزش',
      nafar: '3/4(1K)',
      status: '1',
      date: '1403/10/10',
      type: '0',
      time: '100 ساعت',
      orginalPrice: '1,500,000',
      price: '500,000',
    },
  ]
  dataEvents:any

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
        spaceBetween: 15
      },
      768: {
        slidesPerView: 3.3,
        spaceBetween: 15
      },
      1052: {
        slidesPerView: 4.2,
        spaceBetween: 24
      },
      1600: {
        slidesPerView: 5.2,
        spaceBetween: 24
      }
    }
  };

  ngOnInit(): void {

    this.getEvents()
  }
  getEvents() {
    this.educationService.getEvent({"filter" : {"status" : 3}}).subscribe((data:any) => {
      this.dataEvents = data.data
    })
  }

}
