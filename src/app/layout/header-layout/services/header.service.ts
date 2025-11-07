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
export class HeaderService {
  listMenu : Array<ItemMenu> = []


  constructor() {
    this.createMenu()
  }
  createMenu (){
    this.listMenu= [
      {id:'home-page' , title :'صفحه نخست' , image : 'assets/image/layout/home.svg',url : '/'},
      {id:'charsooq' , title :'محصولات و بسته‌ها' , image : 'assets/image/layout/shopping-bag.svg',url : '/charsooq'},
      {id:'csv' , title :'خلق ارزش مشترک' , image : 'assets/image/layout/CSV.svg',url : '/csv'},
      {id:'accreditation' , title :'اعتباربخشی' , image : 'assets/image/layout/medal-star.svg',url : '/accreditation'},
      {id:'events' , title :'رویدادها' , image : 'assets/image/layout/note-favorite.svg',url : '/events'},
    ]
  }

}
