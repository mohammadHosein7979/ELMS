import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SwiperHelperService {

  swiperOpacity(e: any, swiperPrev: any, swiperNext: any) {
    if (e[0].realIndex == 0) {
      swiperPrev.classList.add('opacity-25')
      swiperPrev.classList.remove('cursorAll')
    } else {
      swiperPrev.classList.remove('opacity-25')
      swiperPrev.classList.add('cursorAll')
    }

    if (e[0].isEnd) {
      swiperNext.classList.add('opacity-25')
      swiperNext.classList.remove('cursorAll')

    } else {
      swiperNext.classList.remove('opacity-25')
      swiperNext.classList.add('cursorAll')
    }
  }
  checkNextFirsTimeSwiperOpacity(e: any, swiperNext: any) {

    swiperNext.classList.add('opacity-25')
  }


}
