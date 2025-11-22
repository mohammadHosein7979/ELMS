import { Injectable } from '@angular/core';
import { Observable, from, switchMap, concatMap, toArray, tap, finalize } from 'rxjs';
import { FileUploadService } from './file-upload.service';
import { environment } from '../../../environments/environment';
import { MicroService } from '../enum/enum';

export interface UploadProgress {
  percent: number;
  loaded: number;
  total: number;
}

export interface UploadResult {
  fileUrl: string;
  message: string;
  idMedia: number;
}

@Injectable({ providedIn: 'root' })
export class FileUploader {
  private chunkSize = 1024 * 1024; // 1MB

  constructor(private uploadService: FileUploadService) {}

  uploadFile(
    file: File, 
    type: number,
    onProgress?: (percent: number) => void,
    onComplete?: (result: UploadResult) => void
  ): Observable<UploadResult> {
    return new Observable<UploadResult>(observer => {
      this.uploadProcess(file, type, onProgress)
        .subscribe({
          next: (result) => {
            observer.next(result);
            onComplete?.(result);
            observer.complete();
          },
          error: (error) => {
            const errorResult: UploadResult = {
              fileUrl: "0",
              message: error?.message || 'خطا در آپلود',
              idMedia: 0
            };
            observer.error(errorResult);
            onComplete?.(errorResult);
          }
        });
    });
  }

  private uploadProcess(file: File, type: number, onProgress?: (percent: number) => void): Observable<UploadResult> {
    // Step 1: Media_Add
    return this.uploadService.mediaAdd({
      idMediaType: type,
      fileName: file.name,
      fileSize: file.size
    }).pipe(
      switchMap((mediaAddResponse: any) => {
        const IDMedia = mediaAddResponse.data.id;
        const chunkCount = mediaAddResponse.data.partSize;

        if (mediaAddResponse.erroCode === 201) {
          // Step 2: Upload chunks
          return this.uploadChunks(file, IDMedia, chunkCount, onProgress).pipe(
            switchMap(() => {
              // Step 3: Generate Media
              return this.uploadService.generateMedia(IDMedia).pipe(
                switchMap((generateResponse: any) => {
                  const result: UploadResult = {
                    fileUrl: `${environment.apiUrl}/${MicroService.mediaapi}/api/File/DownloadFile?IDMedia=${IDMedia}`,
                    message: 'آپلود انجام شد',
                    idMedia: IDMedia
                  };
                  return [result];
                })
              );
            })
          );
        } else {
          const result: UploadResult = {
            fileUrl: "0",
            message: mediaAddResponse.message,
            idMedia: IDMedia
          };
          return [result];
        }
      })
    );
  }

  private uploadChunks(file: File, IDMedia: number, chunkCount: number, onProgress?: (percent: number) => void): Observable<any> {
    const chunkSize = Math.ceil(file.size / chunkCount);
    const uploadObservables = [];

    for (let i = 0; i < chunkCount; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const meta = {
        IdMedia: IDMedia,
        PathFile: "D:\\",
        PartNumber: i
      };

      const uploadObservable = this.uploadService.uploadChunk(chunk, meta).pipe(
        tap(() => {
          // Update progress
          const percent = Math.round(((i + 1) / chunkCount) * 100);
          onProgress?.(percent);
        })
      );

      uploadObservables.push(uploadObservable);
    }

    // Upload chunks sequentially
    return from(uploadObservables).pipe(
      concatMap(observable => observable),
      toArray() // Wait for all to complete
    );
  }
}