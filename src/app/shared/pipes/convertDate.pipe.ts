import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  standalone: true,
  name: 'convertDate'
})
export class ConvertDatePipe implements PipeTransform {
  transform(value: any, type: any,splice:string='/'): any {
    if (type == 'solar') {
      let date: any = value.split(" ", 3)[0].split(splice, 3)[2];
      let month = value.split(" ", 3)[0].split(splice, 3)[1];
      let parseInts = parseInt(month) - 1;
      let dayy;
      let all_month: any = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
      switch (parseInts) {
        case 0 :
          dayy = all_month[0];
          break;
        case 1 :
          dayy = all_month[1];
          break;
        case 2 :
          dayy = all_month[2];
          break;
        case 3 :
          dayy = all_month[3];
          break;
        case 4 :
          dayy = all_month[4];
          break;
        case 5 :
          dayy = all_month[5];
          break;
        case 6 :
          dayy = all_month[6];
          break;
        case 7 :
          dayy = all_month[7];
          break;
        case 8 :
          dayy = all_month[8];
          break;
        case 9 :
          dayy = all_month[9];
          break;
        case 10 :
          dayy = all_month[10];
          break;
        case 11 :
          dayy = all_month[11];
          break;

      }
      let all = date + ' ' + dayy + ' ';
      return all;

    }
    else if(type == 'lunar'){
      let date: any = value.split(" ", 3)[0].split(splice, 3)[2];
      let month = value.split(" ", 3)[0].split(splice, 3)[1];
      let parseInts = parseInt(month) - 1;
      let dayy;
      let all_month: any = ['محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الثانی', 'جمادی‌الاول', 'جمادی‌الثانی', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذیقعده', 'ذیحجه']
      switch (parseInts) {
        case 0 :
          dayy = all_month[0];
          break;
        case 1 :
          dayy = all_month[1];
          break;
        case 2 :
          dayy = all_month[2];
          break;
        case 3 :
          dayy = all_month[3];
          break;
        case 4 :
          dayy = all_month[4];
          break;
        case 5 :
          dayy = all_month[5];
          break;
        case 6 :
          dayy = all_month[6];
          break;
        case 7 :
          dayy = all_month[7];
          break;
        case 8 :
          dayy = all_month[8];
          break;
        case 9 :
          dayy = all_month[9];
          break;
        case 10 :
          dayy = all_month[10];
          break;
        case 11 :
          dayy = all_month[11];
          break;


      }
      // let all = date + ' ' + dayy + ' ';
      let all = date + ' ' +  dayy + ' ' ;
      return all;
    }
    else if(type == 'Christian'){
      let date: any = value.split(" ", 3)[0].split(splice, 3)[2];
      let month = value.split(" ", 3)[0].split(splice, 3)[1];
      let parseInts = parseInt(month) - 1;
      let dayy;
      let all_month: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      switch (parseInts) {
        case 0 :
          dayy = all_month[0];
          break;
        case 1 :
          dayy = all_month[1];
          break;
        case 2 :
          dayy = all_month[2];
          break;
        case 3 :
          dayy = all_month[3];
          break;
        case 4 :
          dayy = all_month[4];
          break;
        case 5 :
          dayy = all_month[5];
          break;
        case 6 :
          dayy = all_month[6];
          break;
        case 7 :
          dayy = all_month[7];
          break;
        case 8 :
          dayy = all_month[8];
          break;
        case 9 :
          dayy = all_month[9];
          break;
        case 10 :
          dayy = all_month[10];
          break;
        case 11 :
          dayy = all_month[11];
          break;


      }
      let all = date + ' ' + dayy + ' ';
      return all;
    }
    else if(type == 'date'){
     return  new Date(value).toLocaleDateString('fa-IR')
    }
    else if(type == 'time'){
     return  value?.split('T', 2)[1];
    }
  }
}
