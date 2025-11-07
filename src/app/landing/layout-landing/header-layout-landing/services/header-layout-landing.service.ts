import {Injectable} from '@angular/core';
export interface ItemMenu {
  id: string;
  title: string;
  image: string;
  url: string;
}
@Injectable({
  providedIn: 'root'
})
export class HeaderLayoutLandingService {
  listMenu : Array<ItemMenu> = []


  constructor() {
    this.createMenu()
  }
  createMenu (){
    this.listMenu= [
      {id:'home-page' , title :'خانه' , image : 'assets/image/landing/home-svgrepo-com.svg',url : '/'},
      {id:'charsooq' , title :'آموزش ها' , image : 'assets/image/landing/book-open-svgrepo-com.svg',url : '/charsooq'},
      {id:'csv' , title :'پیش تولید' , image : 'assets/image/landing/cinema-clapper-director-scene-movie-svgrepo-com.svg',url : '/csv'},
      {id:'accreditation' , title :'خدمات' , image : 'assets/image/landing/clock-lines-svgrepo-com.svg',url : '/accreditation'},
      {id:'events' , title :'درباره ما' , image : 'assets/image/landing/about-information-info-help-svgrepo-com.svg',url : '/events'},
      {id:'events' , title :'ارتباط با ما' , image : 'assets/image/landing/chat-line-svgrepo-com.jpg',url : '/events'},
    ]
  }

}
