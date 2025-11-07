import {Injectable, Injector} from '@angular/core';
import {NzNotificationDataOptions, NzNotificationRef, NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  nzNotificationService: NzNotificationService;

  constructor(injector: Injector) {
    this.nzNotificationService = injector.get(NzNotificationService);
  }

  success(content: string, options?: NzNotificationDataOptions): NzNotificationRef {
    return this.nzNotificationService.success('موفق', content, options);
  }

  error(content: string, options?: NzNotificationDataOptions): NzNotificationRef {
    return this.nzNotificationService.error('خطا', content, );
  }

  warning(content: string, options?: NzNotificationDataOptions): NzNotificationRef {
    return this.nzNotificationService.warning('هشدار', content, options);
  }

  info(content: string, options?: NzNotificationDataOptions): NzNotificationRef {
    return this.nzNotificationService.info('اطلاعیه', content, options);
  }
}
