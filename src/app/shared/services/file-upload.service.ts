// // file-upload.service.ts
import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {concatMap, switchMap, tap, toArray} from 'rxjs/operators';
import {from, map, Observable, of} from 'rxjs';
import {BaseService} from "./base.service";
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class FileUploadService extends BaseService{
  private baseUrl = '/api/media';

constructor(injector:Injector) {
  super(injector);
}

  // uploadFile(file: File, idMediaType = 3): Observable<any> {
  //   if (!file) return of(null);
  //
  //   const metaBody = {
  //     idMediaType,
  //     fileName: file.name,
  //     fileSize: file.size,
  //   };
  //
  //   return this.http.postHttp(`/mediaapi/api/v1/Media/Add`, metaBody).pipe(
  //     switchMap((meta: any) => {
  //       const formData = new FormData();
  //       formData.append('file', file);
  //       formData.append('meta', JSON.stringify({
  //         "IdMedia": meta?.data?.id,
  //         "PathFile": "D:",
  //         "PartNumber": meta?.data?.partSize
  //       }));
  //
  //       // ذخیره response از Media/Add
  //       const mediaAddResponse = meta;
  //
  //       return this.httpClient.post(
  //         `${environment.apiUrl}/mediaapi/api/v1/ParticleMedia/UploadFileBinery`,
  //         formData
  //       ).pipe(
  //         map(uploadRes => ({
  //           mediaAddResponse: mediaAddResponse,  // response از Media/Add
  //           uploadResponse: uploadRes           // response از UploadFileBinery
  //         }))
  //       );
  //     })
  //   );
  // }
  generateParticleMedia(mediaId: string): Observable<any> {
    const generateBody = {
      IDMedia: mediaId
      // یا سایر پارامترهای مورد نیاز بر اساس داکیومنت API
    };

    return this.get(
      `/mediaapi/api/v1/ParticleMedia/Generate`,
      null,
      {"IDMedia": mediaId}
    );
  }



  uploadFile(file: File, idMediaType = 3, progressCallback?: (progress: number) => void): Observable<any> {
    if (!file) return of(null);

    const metaBody = {
      idMediaType,
      fileName: file.name,
      fileSize: file.size,
    };

    return this.http.postHttp(`/mediaapi/api/v1/Media/Add`, metaBody).pipe(
      switchMap((meta: any) => {
        const mediaAddResponse = meta;
        const partSize = meta?.data?.partSize || 1;
        const mediaId = meta?.data?.id;
        const chunkSize = Math.ceil(file.size / partSize);

        // ایجاد آرایه از observable ها برای آپلود هر chunk
        const uploadObservables = [];

        for (let partNumber = 0; partNumber < partSize; partNumber++) {
          const start = partNumber * chunkSize;
          const end = Math.min(start + chunkSize, file.size);
          const chunk = file.slice(start, end);

          const formData = new FormData();
          formData.append('file', chunk, file.name);
          formData.append('meta', JSON.stringify({
            "IdMedia": mediaId,
            "PathFile": "D:",
            "PartNumber": partNumber
          }));

          uploadObservables.push(
            this.httpClient.post(
              `${environment.apiUrl}/mediaapi/api/v1/ParticleMedia/UploadFileBinery`,
              formData
            )
          );
        }

        // آپلود سریال با نمایش پیشرفت
        let completedUploads = 0;
        return from(uploadObservables).pipe(
          concatMap((uploadObservable, index) => {
            return uploadObservable.pipe(
              tap(() => {
                completedUploads++;
                // محاسبه پیشرفت
                const uploadProgress = (completedUploads / partSize) * 100;
                if (progressCallback) {
                  progressCallback(uploadProgress);
                }
                console.log(`Upload progress: ${uploadProgress.toFixed(2)}% (${completedUploads}/${partSize})`);
              })
            );
          }),
          toArray(), // جمع‌آوری تمام results در یک آرایه
          switchMap((uploadResults: any[]) => {
            // بعد از اتمام تمام آپلودها، سرویس Generate را صدا بزن
            if (progressCallback) {
              progressCallback(100); // پیشرفت کامل
            }
            return this.get(
              `${environment.apiUrl}/mediaapi/api/v1/ParticleMedia/Generate`,
              {},
              {
                IDMedia: mediaId
              }
            ).pipe(
              map(generateRes => ({
                mediaAddResponse: mediaAddResponse,    // response از Media/Add
                uploadResponses: uploadResults,        // response های از UploadFileBinery
                generateResponse: generateRes          // response از Generate
              }))
            );
          })
        );
      })
    );
  }
  // uploadFile(file: File, idMediaType = 3, progressCallback?: (progress: number) => void): Observable<any> {
  //   if (!file) return of(null);
  //
  //   const metaBody = {
  //     idMediaType,
  //     fileName: file.name,
  //     fileSize: file.size,
  //   };
  //
  //   return this.http.postHttp(`/mediaapi/api/v1/Media/Add`, metaBody).pipe(
  //     switchMap((meta: any) => {
  //       const mediaAddResponse = meta;
  //       const partSize = meta?.data?.partSize || 1;
  //       const mediaId = meta?.data?.id;
  //
  //       // اگر partSize = 1 باشد، کل فایل یکجا آپلود می‌شود
  //       if (partSize === 1) {
  //         const formData = new FormData();
  //         formData.append('file', file);
  //         formData.append('meta', JSON.stringify({
  //           "IdMedia": mediaId,
  //           "PathFile": "D:",
  //           "PartNumber": 0
  //         }));
  //
  //         return this.httpClient.post(
  //           `${environment.apiUrl}/mediaapi/api/v1/ParticleMedia/UploadFileBinery`,
  //           formData
  //         ).pipe(
  //           switchMap((uploadRes: any) => {
  //             return this.httpClient.post(
  //               `${environment.apiUrl}/mediaapi/api/v1/ParticleMedia/GenerateParticleMedia`,
  //               { mediaId: mediaId }
  //             ).pipe(
  //               map(generateRes => ({
  //                 mediaAddResponse: mediaAddResponse,
  //                 uploadResponses: [uploadRes],
  //                 generateResponse: generateRes
  //               }))
  //             );
  //           })
  //         );
  //       }
  //
  //       // برای فایل‌های بزرگ - آپلود chunked واقعی
  //       const chunkSize = Math.ceil(file.size / partSize);
  //       const uploadObservables = [];
  //
  //       for (let partNumber = 0; partNumber < partSize; partNumber++) {
  //         const start = partNumber * chunkSize;
  //         const end = Math.min(start + chunkSize, file.size);
  //
  //         // ایجاد blob از chunk واقعی
  //         const chunkBlob = file.slice(start, end);
  //
  //         const formData = new FormData();
  //         formData.append('file', chunkBlob, `chunk-${partNumber}-${file.name}`);
  //         formData.append('meta', JSON.stringify({
  //           "IdMedia": mediaId,
  //           "PathFile": "D:",
  //           "PartNumber": partNumber
  //         }));
  //
  //         uploadObservables.push(
  //           this.httpClient.post(
  //             `${environment.apiUrl}/mediaapi/api/v1/ParticleMedia/UploadFileBinery`,
  //             formData
  //           )
  //         );
  //       }
  //
  //       // بقیه کد مانند قبل...
  //       let completedUploads = 0;
  //       return from(uploadObservables).pipe(
  //         concatMap((uploadObservable, index) => {
  //           return uploadObservable.pipe(
  //             tap(() => {
  //               completedUploads++;
  //               const uploadProgress = (completedUploads / partSize) * 100;
  //               if (progressCallback) {
  //                 progressCallback(uploadProgress);
  //               }
  //             })
  //           );
  //         }),
  //         toArray(),
  //         switchMap((uploadResults: any[]) => {
  //           if (progressCallback) {
  //             progressCallback(100);
  //           }
  //           return this.get(
  //             `${environment.apiUrl}/mediaapi/api/v1/ParticleMedia/Generate`,
  //             {},
  //             { mediaId: mediaId }
  //           ).pipe(
  //             map(generateRes => ({
  //               mediaAddResponse: mediaAddResponse,
  //               uploadResponses: uploadResults,
  //               generateResponse: generateRes
  //             }))
  //           );
  //         })
  //       );
  //     })
  //   );
  // }
}
// src/app/shared/services/file-upload.service.ts
