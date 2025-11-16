import {Component, inject, Injector, Input} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzInputDirective} from "ng-zorro-antd/input";
import {ControlContainer, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";
import {FileUploadService} from "../../shared/services/file-upload.service";
import {finalize} from "rxjs";

@Component({
    selector: 'app-file-upload',
    imports: [
        NzButtonComponent,
        NzInputDirective,
        ReactiveFormsModule,
    ],
    templateUrl: './file-upload.component.html',
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective }
    ],
    styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent extends BaseService{
  @Input('controlName') controlName :any
  private uploadService = inject(FileUploadService)
  loadingUpload = false;
  constructor(injector:Injector,private parent: FormGroupDirective) {
    super(injector)
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.loadingUpload = true;

    this.uploadService
      .uploadFile(file)
      .pipe(finalize(() => (this.loadingUpload = false)))
      .subscribe({
        next: res => {
          this.parent.form.get(this.controlName)?.setValue(res?.data?.id);
        }});
  }

}
