import {Component, inject, Injector, Input, ViewChild, ElementRef} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzInputDirective} from "ng-zorro-antd/input";
import {ControlContainer, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";
import {FileUploadService} from "../../shared/services/file-upload.service";
import {finalize} from "rxjs";
import {NgIf} from "@angular/common";
import {NzProgressComponent} from "ng-zorro-antd/progress";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {MicroService} from "../../shared/enum/enum";
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-file-upload',
  imports: [
    NzButtonComponent,
    NzInputDirective,
    ReactiveFormsModule,
    NgIf,
    NzProgressComponent,
    NzIconDirective
  ],
    templateUrl: './file-upload.component.html',
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective }
    ],
    styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent extends BaseService{
  @Input('controlName') controlName: any;
  @Input('avatar') avatar: any;
  @Input('type') type: any = 'image';
  
  @ViewChild('fileInputImage') fileInputImage!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputMedia') fileInputMedia!: ElementRef<HTMLInputElement>;
  
  private uploadService = inject(FileUploadService);
  loadingUpload = false;
  uploadProgress = 0;
  showProgress = false;

  constructor(injector: Injector, private parent: FormGroupDirective) {
    super(injector);
  }

  onFileSelected(event: Event, idMediaType: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.loadingUpload = true;
    this.showProgress = true;
    this.uploadProgress = 0;

    this.uploadService
      .uploadFile(file, idMediaType, (progress) => {
        this.uploadProgress = progress;
      })
      .pipe(finalize(() => {
        this.loadingUpload = false;
        // بعد از 2 ثانیه نوار پیشرفت مخفی شود
        setTimeout(() => {
          this.showProgress = false;
        }, 2000);
      }))
      .subscribe({
        next: (res) => {
    
          // استفاده از ID از Media/Add
          this.parent.form.get(this.controlName)?.setValue(res.mediaAddResponse?.data?.id);
          setTimeout(() => {
            this.avatar = `${environment.apiUrl}/${MicroService.mediaapi}/api/File/DownloadFile?IDMedia=${res.mediaAddResponse?.data?.id}`;
          }, 0);
     
          this.notification.success('فایل با موفقیت آپلود شد');
        },
        error: (err) => {
          this.notification.error('خطا در آپلود فایل');
        }
      });
  }

  onDeleteAvatar() {
    // پاک کردن آواتار از فرم
    this.parent.form.get(this.controlName)?.setValue(null);
    this.avatar = null;
    this.notification.success('آواتار با موفقیت حذف شد');
  }

  // متد برای باز کردن dialog انتخاب فایل
  openFileSelector() {
    if (this.type === 'image' && this.fileInputImage) {
      this.fileInputImage.nativeElement.click();
    } else if (this.type === 'media' && this.fileInputMedia) {
      this.fileInputMedia.nativeElement.click();
    }
  }


  openImagePreview() {
    if (this.avatar) {
      window.open(this.avatar, '_blank');
  
    }
}
}