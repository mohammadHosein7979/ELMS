import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {fa_IR as zorroLang, NZ_DATE_CONFIG, /*NZ_DATE_CONFIG,*/ NZ_DATE_LOCALE, NZ_I18N} from 'ng-zorro-antd/i18n';
import {default as ngLang} from '@angular/common/locales/fa';
import {faIR as dateLang} from 'date-fns/locale';
import {registerLocaleData} from '@angular/common';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
// import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzTreeModule} from 'ng-zorro-antd/tree';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzCascaderModule} from 'ng-zorro-antd/cascader';
import {NZ_CONFIG, NzConfig} from 'ng-zorro-antd/core/config';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

const LANG = {
  ng: ngLang,
  zorro: zorroLang,
  date: dateLang
};
registerLocaleData(LANG.ng);

const NZ_MODULE = [
  NzLayoutModule,
  NzBreadCrumbModule,
  NzIconModule,
  NzButtonModule,
  NzPopoverModule,
  NzTableModule,
  NzTabsModule,
  NzDividerModule,
  NzCardModule,
  NzSelectModule,
  NzGridModule,
  NzSpaceModule,
  NzFormModule,
  NzInputModule,
  NzSwitchModule,
  NzTreeModule,
  NzCheckboxModule,
  NzMessageModule,
  NzNotificationModule,
  NzTypographyModule,
  NzToolTipModule,
  NzDropDownModule,
  NzRadioModule,
  NzInputNumberModule,
  NzModalModule,
  NzBadgeModule,
  NzSpinModule,
  NzEmptyModule,
  NzSkeletonModule,
  NzDatePickerModule,
  NzResultModule,
  NzListModule,
  NzAvatarModule,
  NzCascaderModule,
  NzCollapseModule,
  NzUploadModule,
  NzPopconfirmModule,
  NzCarouselModule
];

const ngZorroConfig: NzConfig = {
  notification: {nzDirection: 'rtl', nzPlacement: 'topLeft'}
};

@NgModule({
  declarations: [],
  imports: [CommonModule, ...NZ_MODULE],
  exports: [...NZ_MODULE],
  providers: [
    {provide: LOCALE_ID, useValue: 'fa-IR'},
    {provide: NZ_CONFIG, useValue: ngZorroConfig},
    {provide: NZ_I18N, useValue: LANG.zorro},
    {provide: NZ_DATE_LOCALE, useValue: LANG.date},
    // {provide: NZ_DATE_CONFIG, useValue: {firstDayOfWeek: 1}}
    {
      provide: NZ_DATE_CONFIG,
      useValue: {
        displayFormats: {
          veryShortWeekLabel: 'dd',
          dateInput: 'yyyy/MM/DD',
          dateTimeInput: 'yyyy-MM-DD HH:mm:ss'
        }
      }
    }
  ]
})
export class NzZorroModule {}
