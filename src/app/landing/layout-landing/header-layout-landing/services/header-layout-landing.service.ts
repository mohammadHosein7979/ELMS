import {Injectable} from '@angular/core';
export interface ItemMenu {
  id: string;
  title: string;
  image: string;
  anchor: string;
}
@Injectable({
  providedIn: 'root'
})
export class HeaderLayoutLandingService {
  listMenu : Array<any> = []


  constructor() {
    this.createMenu()
  }
  createMenu (){
    this.listMenu = [
      { id:'home', title:'خانه', url:'/', anchor:'top' ,image : 'assets/image/landing/home-svgrepo-com.svg'},
      { id:'courses', title:'آموزش‌ها', url:'/', anchor:'courses-section' ,image : 'assets/image/landing/book-open-svgrepo-com.svg'},
      { id:'about', title:'درباره ما', url:'/', anchor:'about' , image : 'assets/image/landing/about-information-info-help-svgrepo-com.svg'},
      // { id:'contact', title:'ارتباط با ما', url:'/', anchor:'contact-section' },
    ];

    // this.listMenu= [
    //   {id:'home-page' , title :'خانه' , image : 'assets/image/landing/home-svgrepo-com.svg',anchor : '/'},
    //   {id:'charsooq' , title :'آموزش ها' , image : 'assets/image/landing/book-open-svgrepo-com.svg',anchor : '/popularEvents'},
    //   // {id:'csv' , title :'پیش تولید' , image : 'assets/image/landing/cinema-clapper-director-scene-movie-svgrepo-com.svg',url : '/csv'},
    //   {id:'accreditation' , title :'خدمات' , image : 'assets/image/landing/clock-lines-svgrepo-com.svg',anchor : '/accreditation'},
    //   {id:'events' , title :'درباره ما' , image : 'assets/image/landing/about-information-info-help-svgrepo-com.svg',anchor : 'about'},
    //   {id:'events' , title :'ارتباط با ما' , image : 'assets/image/landing/chat-line-svgrepo-com.jpg',anchor : '/events'},
    // ]
  }

}
