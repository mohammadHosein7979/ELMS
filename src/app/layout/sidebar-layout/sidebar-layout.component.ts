import {Component, Injector, OnInit} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {map} from "rxjs";
import {LayoutService} from "../services/layout.service";
import {TypeClasses} from "../../pages/my-educational-system/pages/classes/services/classes.service";
import {TypeTests} from "../../pages/my-educational-system/pages/tests/services/tests.service";
import {TypeQuestionBank} from "../../pages/my-educational-system/pages/question-bank/services/question-bank.service";

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.scss'
})
export class SidebarLayoutComponent extends BaseService implements OnInit{
  menus: Array<any> = [];
  url:any
  constructor(injector: Injector,protected layoutService:LayoutService) {
    super(injector);
  }

  ngOnInit(): void {
    this.createMenu()
    this.layoutService.getMenuObservable().subscribe((d:any)=>{
      this.url = d
    })
  }
  createMenu(){
    this.menus = [
      {
        title : 'خدمات',
        id : '1',
        subMenu : [
          {
            id : '11',
            title : 'آموزش ها',
            iconSelect : 'educationSelect.svg',
            iconDeSelect : 'educationDeSelect.svg',
            router: '/',
          }
        ]
      },
      {
        title : 'آموزش های من',
        id : '2',
        subMenu : [
          {
            id : '22',
            title : 'دوره ها',
            iconSelect : 'courseSelect.svg',
            iconDeSelect :'courseDeSelect.svg',
            router: '/my-training/courses',
          },
          // {
          //   id : '23',
          //   title : 'نقشه راه',
          //   iconSelect : 'roadmapSelect.svg',
          //   iconDeSelect :'courseDeSelect.svg',
          //   router: '/my-training/roadmap',
          // },
          {
            id : '24',
            title : 'سوابق آموزشی',
            iconSelect : 'educationalRecordSelect.svg',
            iconDeSelect : 'educationalRecordDeSelect.svg',
            router: '/my-training/records',
          },
        ]
      },
      {
        title : 'سیستم آموزشی من',
        id : '3',
        subMenu : [
          {
            id : '31',
            title : 'کلاس های آنلاین',
            iconSelect : 'OnlineClassesSelect.svg',
            iconDeSelect :'OnlineClassesDeSelect.svg',
            router: '/my-educational-system/classes?type='+TypeClasses.online,
          },
          {
            id : '32',
            title : 'کلاس های آفلاین',
            iconSelect : 'OnlineClassesSelect.svg',
            iconDeSelect :'OnlineClassesDeSelect.svg',
            router: '/my-educational-system/classes?type='+TypeClasses.offline,
          },
          {
            id : '33',
            title : 'کلاس های حضوری',
            iconSelect : 'OnlineClassesSelect.svg',
            iconDeSelect :'OnlineClassesDeSelect.svg',
            router: '/my-educational-system/classes?type='+TypeClasses.faceToFace,
          },
          {
            id : '34',
            title : 'آزمون ها',
            iconSelect : 'testSelect.svg',
            iconDeSelect :'testDeSelect.svg',
            routerChildOne:'/my-educational-system/tests?type='+TypeTests.uncorrected,
            routerChildTwo:'/my-educational-system/tests?type='+TypeTests.completed,
            router: '/my-educational-system/tests?type='+TypeTests.notHeld,
          },
          {
            id : '35',
            title : 'بانک سوالات',
            iconSelect : 'questionBankSelect.svg',
            iconDeSelect :'OnlineClassesDeSelect.svg',
            routerChildOne:'/my-educational-system/question-bank?type='+TypeQuestionBank.create,
            router: '/my-educational-system/question-bank?type='+TypeQuestionBank.list,
          },
          {
            id : '36',
            title : 'مدیریت دوره',
            iconSelect : 'courseManagementSelect.svg',
            iconDeSelect :'courseManagementDeSelect.svg',
            router: '/my-educational-system/course-management',
          },
        ]
      },
      {
        title : 'گزارشات',
        id : '4',
        subMenu : [
          {
            id : '41',
            title : 'تراکنش های مالی',
            iconSelect : 'Frame332.svg',
            iconDeSelect :'Frame3313.svg',
            router: '/reports/financial-transactions',
          },
        ]
      },
    ]

  }


}
