// file-upload.service.ts
import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {BaseService} from "./base.service";
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class FileUploadService extends BaseService{
  private baseUrl = '/api/media';

constructor(injector:Injector) {
  super(injector);
}

  uploadFile(file: File, idMediaType = 3): Observable<any> {
    if (!file) return of(null);

    const metaBody = {
      idMediaType,
      fileName: file.name,
      fileSize: file.size,
    };

    return this.http.postHttp(`/mediaapi/api/v1/Media/Add`, metaBody).pipe(
      switchMap((meta:any) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('meta', JSON.stringify(
          {
          "IdMedia":meta?.data?.id,
            "PathFile":"D:",
            "PartNumber":1
        }
        ));
        return this.httpClient.post(`${environment.apiUrl}/mediaapi/api/v1/ParticleMedia/UploadFileBinery`, formData);
      })
    );
  }
}
