import {Component, inject, Injector, Input, ViewChild, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
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
import {environment} from '../../../environments/environment';
import {FileUploader} from '../../shared/services/file-upload';

@Component({
  selector: 'app-file-upload',
  imports: [
    NzButtonComponent,
    ReactiveFormsModule,
    NgIf,
    NzProgressComponent,
    NzIconDirective
  ],
  templateUrl: './file-upload.component.html',
  viewProviders: [
    {provide: ControlContainer, useExisting: FormGroupDirective}
  ],
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent extends BaseService implements OnChanges {
  @Input('disable') disable: boolean = false;
  @Input('controlName') controlName: any;
  @Input('type') type: any = 'image';
  @Input('mediaId') mediaId: any;
  avatar: string | null = null;

  @ViewChild('fileInputImage') fileInputImage!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputMedia') fileInputMedia!: ElementRef<HTMLInputElement>;

  private uploadService = inject(FileUploadService);
  loadingUpload = false;
  uploadProgress = 0;
  showProgress = false;

  // ${environment.apiUrl}/${MicroService.mediaapi}/api/File/DownloadFile?IDMedia=
  constructor(injector: Injector, private parent: FormGroupDirective, private fileUploader: FileUploader) {
    super(injector);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mediaId']) {
      this.updateAvatar();
    }
  }

  private updateAvatar(): void {
    if (this.isValidMediaId(this.mediaId)) {
      this.avatar = `${environment.apiUrl}/${MicroService.mediaapi}/api/File/DownloadFile?IDMedia=${this.mediaId}`;
    } else {
      this.avatar = this.getDefaultAvatar(); // متد برای آواتار پیش‌فرض
    }
  }

  private isValidMediaId(id: any): boolean {
    return id !== null &&
      id !== undefined &&
      id !== '' &&
      !isNaN(id) && // اگر عددی است
      id > 0; // اگر باید بزرگتر از صفر باشد
  }

  private getDefaultAvatar(): any {
    return null;
  }

  onFileSelected(event: Event, idMediaType: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.loadingUpload = true;
    this.showProgress = true;
    this.uploadProgress = 0;

    this.fileUploader.uploadFile(
      file,
      idMediaType,
      (progress) => {
        this.uploadProgress = progress;
      }
    ).subscribe({
      next: (result) => {
        if (result.fileUrl !== "0") {
          // موفقیت آمیز
          this.parent.form.get(this.controlName)?.setValue(result.idMedia);
          this.avatar = result.fileUrl;
          this.notification.success(result.message);
        } else {
          // خطا
          this.notification.error(result.message);
        }
      },
      error: (result) => {
        this.notification.error(result.message);
      },
      complete: () => {
        this.loadingUpload = false;
        setTimeout(() => {
          this.showProgress = false;
        }, 2000);
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
