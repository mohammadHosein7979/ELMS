//
//
// import { Component, ElementRef, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import {DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
// import { FormsModule } from "@angular/forms";
//
// interface VideoPart {
//   partIndex: number;
//   duration: number;
//   startTime: number;
//   endTime: number;
//   fileUrl: string;
//   blobUrl: string;
//   state: 'idle' | 'downloading' | 'ready' | 'error';
//   blob: Blob | null;
//   loadedBytes: number;
//   totalBytes: number;
// }
//
// @Component({
//   selector: 'app-video-player',
//   templateUrl: './video-player.component.html',
//   standalone: true,
//   imports: [NgForOf, NgClass, FormsModule, NgIf, DecimalPipe],
//   styleUrls: ['./video-player.component.scss']
// })
// export class VideoPlayerComponent implements OnInit, OnDestroy {
//   @ViewChild('videoEl', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
//   video!: HTMLVideoElement;
//
//   mediaId = 510765;
//   parts: VideoPart[] = [];
//   progressPercent = 0;
//   currentPartIndex = 0;
//   totalDuration = 0;
//
//   currentTime = 0;
//   formattedTime = '00:00';
//   totalFormattedTime = '00:00';
//
//   // وضعیت‌ها
//   downloadingPart: number | null = null;
//   downloadProgress = 0;
//   userHasInteracted = false;
//
//   // کنترل‌ها
//   private preloadTimeout: any;
//   private updateInterval: any;
//   isDragging = false;
//   timelineSteps: number[] = [];
//
//   // مدیریت دانلود
//   private maxConcurrentDownloads = 2;
//   private activeDownloads = new Set<number>();
//
//   // برای مدیریت event handlers
//   private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
//   private mouseUpHandler: (() => void) | null = null;
//
//   // برای مدیریت seek فوری
//   private isSeeking = false;
//
//   constructor(private http: HttpClient) {}
//
//   async ngOnInit() {
//     this.video = this.videoRef.nativeElement;
//     this.video.controls = false;
//     this.video.volume = 0.8;
//     this.video.muted = false;
//
//     // رویدادها
//     this.video.addEventListener('timeupdate', () => this.updateVideoTime());
//     this.video.addEventListener('ended', () => this.onVideoEnded());
//     this.video.addEventListener('playing', () => this.onVideoPlaying());
//     this.video.addEventListener('canplay', () => this.onVideoCanPlay());
//     this.video.addEventListener('loadedmetadata', () => this.onVideoLoaded());
//
//     await this.loadParts();
//     await this.initializePlayer();
//
//     this.startTimeUpdate();
//   }
//
//   // گوش دادن به کلیک کاربر در کل صفحه
//   @HostListener('document:click', ['$event'])
//   onDocumentClick() {
//     if (!this.userHasInteracted) {
//       this.userHasInteracted = true;
//       console.log('User has interacted with document');
//     }
//   }
//
//   async loadParts() {
//     try {
//       const partsData: any = await this.http
//         .get(`https://api.openr.ir/mediaapi/api/v1/ParticleMedia/GetAllPartMedia?idMedia=${this.mediaId}`, {
//           headers: { IDMedia: this.mediaId.toString() }
//         })
//         .toPromise();
//
//       let startTime = 0;
//       this.parts = partsData.data.map((p: any) => {
//         const endTime = startTime + p.durationPart;
//         const part = {
//           partIndex: p.partNumber,
//           duration: p.durationPart,
//           startTime,
//           endTime,
//           fileUrl: `https://api.openr.ir/mediaapi/api/File/DownloadFilePartVideo?IDMedia=${this.mediaId}&index=${p.partNumber}`,
//           blobUrl: '',
//           state: 'idle' as const,
//           blob: null,
//           loadedBytes: 0,
//           totalBytes: 0
//         };
//         startTime = endTime;
//         return part;
//       });
//
//       this.totalDuration = startTime;
//       this.totalFormattedTime = this.formatTime(this.totalDuration);
//       this.createTimelineSteps();
//
//     } catch (error) {
//       console.error('Error loading parts:', error);
//     }
//   }
//
//   async initializePlayer() {
//     if (this.parts.length === 0) return;
//
//     // فقط پارت اول را دانلود کن
//     await this.downloadPart(0);
//
//     // پخش پارت اول
//     await this.playPart(0, false);
//   }
//
//   private async downloadPart(partIndex: number): Promise<boolean> {
//     if (partIndex >= this.parts.length) return false;
//
//     const part = this.parts[partIndex];
//     if (part.state === 'ready' || part.state === 'downloading') {
//       return part.state === 'ready';
//     }
//
//     if (this.activeDownloads.size >= this.maxConcurrentDownloads) {
//       return false;
//     }
//
//     part.state = 'downloading';
//     this.downloadingPart = partIndex;
//     this.activeDownloads.add(partIndex);
//
//     try {
//       const response = await fetch(part.fileUrl);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//
//       const contentLength = response.headers.get('content-length');
//       part.totalBytes = contentLength ? parseInt(contentLength) : 0;
//
//       const blob = await response.blob();
//       const blobUrl = URL.createObjectURL(blob);
//
//       part.blob = blob;
//       part.blobUrl = blobUrl;
//       part.state = 'ready';
//
//       console.log(`Part ${partIndex + 1} downloaded successfully`);
//       return true;
//
//     } catch (error) {
//       console.error(`Error downloading part ${partIndex + 1}:`, error);
//       part.state = 'error';
//       return false;
//     } finally {
//       this.activeDownloads.delete(partIndex);
//       this.downloadingPart = null;
//       this.downloadProgress = 0;
//     }
//   }
//
//   // پخش یک پارت (برای پخش عادی)
//   async playPart(partIndex: number, autoplay = false): Promise<boolean> {
//     console.log(`playPart called: part ${partIndex + 1}, autoplay: ${autoplay}`);
//
//     if (partIndex < 0 || partIndex >= this.parts.length) {
//       return false;
//     }
//
//     const part = this.parts[partIndex];
//     if (!part) return false;
//
//     // اگر پارت آماده نیست، دانلودش کن
//     if (part.state !== 'ready') {
//       const success = await this.downloadPart(partIndex);
//       if (!success) return false;
//     }
//
//     // تغییر پارت فعلی
//     this.currentPartIndex = partIndex;
//
//     // تنظیم src
//     if (part.blobUrl) {
//       this.video.src = part.blobUrl;
//     } else {
//       this.video.src = part.fileUrl;
//     }
//
//     this.video.load();
//
//     // شروع دانلود پارت بعدی بلافاصله
//     this.scheduleNextPartDownload(partIndex);
//
//     // پخش
//     if (autoplay) {
//       await this.safePlay();
//     }
//
//     return true;
//   }
//
//   // تغییر پارت برای seek فوری (بدون منتظر ماندن برای دانلود)
//   private async switchPartForSeek(partIndex: number): Promise<boolean> {
//     console.log(`switchPartForSeek called: part ${partIndex + 1}`);
//
//     if (partIndex < 0 || partIndex >= this.parts.length) {
//       return false;
//     }
//
//     const part = this.parts[partIndex];
//     if (!part) return false;
//
//     // ذخیره وضعیت پخش فعلی
//     const wasPlaying = !this.video.paused;
//
//     // متوقف کردن پخش فعلی
//     this.video.pause();
//
//     // تغییر پارت فعلی
//     this.currentPartIndex = partIndex;
//
//     // اگر پارت آماده است، از blob استفاده کن
//     if (part.state === 'ready' && part.blobUrl) {
//       this.video.src = part.blobUrl;
//       console.log(`Using blob for part ${partIndex + 1}`);
//     } else {
//       // اگر آماده نیست، از URL اصلی استفاده کن (seek فوری)
//       this.video.src = part.fileUrl;
//       console.log(`Using direct URL for part ${partIndex + 1} (will buffer)`);
//
//       // شروع دانلود این پارت در پس‌زمینه
//       this.downloadPartInBackground(partIndex);
//     }
//
//     this.video.load();
//
//     // شروع دانلود پارت بعدی
//     this.scheduleNextPartDownload(partIndex);
//
//     return wasPlaying;
//   }
//
//   // دانلود در پس‌زمینه
//   private downloadPartInBackground(partIndex: number) {
//     if (partIndex >= this.parts.length) return;
//
//     const part = this.parts[partIndex];
//     if (part.state !== 'idle') return;
//
//     // با تاخیر کمی دانلود را شروع کن تا seek اولیه انجام شود
//     setTimeout(() => {
//       this.downloadPart(partIndex);
//     }, 1000);
//   }
//
//   // پخش امن ویدیو بدون خطا
//   private async safePlay(): Promise<boolean> {
//     try {
//       await this.video.play();
//       console.log('Video playing successfully');
//       return true;
//     } catch (error: any) {
//       console.warn('Play failed:', error.message);
//
//       if (error.name === 'NotAllowedError') {
//         try {
//           console.log('Trying muted autoplay...');
//           this.video.muted = true;
//           await this.video.play();
//           console.log('Video playing with muted audio');
//
//           // وقتی کاربر کلیک کرد، صدا را برگردان
//           const unmuteOnClick = () => {
//             if (this.userHasInteracted) {
//               this.video.muted = false;
//               document.removeEventListener('click', unmuteOnClick);
//             }
//           };
//           document.addEventListener('click', unmuteOnClick);
//
//           return true;
//         } catch (mutedError) {
//           console.error('Muted autoplay also failed:', mutedError);
//         }
//       }
//
//       return false;
//     }
//   }
//
//   private scheduleNextPartDownload(currentPartIndex: number) {
//     const nextPartIndex = currentPartIndex + 1;
//
//     if (this.preloadTimeout) {
//       clearTimeout(this.preloadTimeout);
//     }
//
//     this.preloadTimeout = setTimeout(() => {
//       this.downloadNextPartIfNeeded(nextPartIndex);
//     }, 300);
//   }
//
//   private async downloadNextPartIfNeeded(nextPartIndex: number) {
//     if (nextPartIndex >= this.parts.length) return;
//
//     const nextPart = this.parts[nextPartIndex];
//     if (!nextPart || nextPart.state === 'ready' || nextPart.state === 'downloading') {
//       return;
//     }
//
//     console.log(`Starting download of next part ${nextPartIndex + 1}`);
//     await this.downloadPart(nextPartIndex);
//   }
//
//   private updateVideoTime() {
//     if (!this.parts.length || !this.video || this.isSeeking) return;
//
//     const currentPart = this.parts[this.currentPartIndex];
//     if (!currentPart) return;
//
//     // محاسبه زمان کل سپری شده
//     let totalElapsed = 0;
//     for (let i = 0; i < this.currentPartIndex; i++) {
//       totalElapsed += this.parts[i].duration;
//     }
//     totalElapsed += this.video.currentTime;
//
//     // ذخیره زمان
//     this.currentTime = totalElapsed;
//     this.formattedTime = this.formatTime(totalElapsed);
//
//     // محاسبه درصد پیشرفت
//     if (this.totalDuration > 0) {
//       this.progressPercent = (totalElapsed / this.totalDuration) * 100;
//     }
//
//     // اگر نزدیک پایان پارت هستیم
//     if (currentPart.duration - this.video.currentTime < 3) {
//       const nextPartIndex = this.currentPartIndex + 1;
//       if (nextPartIndex < this.parts.length) {
//         const nextPart = this.parts[nextPartIndex];
//
//         if (nextPart.state === 'idle' && !this.activeDownloads.has(nextPartIndex)) {
//           this.downloadPart(nextPartIndex);
//         }
//
//         // اگر کمتر از 1 ثانیه مانده، انتقال را آماده کن
//         if (currentPart.duration - this.video.currentTime < 1) {
//           this.prepareNextPartTransition(nextPartIndex);
//         }
//       }
//     }
//   }
//
//   private prepareNextPartTransition(nextPartIndex: number) {
//     const nextPart = this.parts[nextPartIndex];
//     if (nextPart.state === 'ready' && nextPart.blobUrl) {
//       // pre-buffer ساده
//       const tempVideo = document.createElement('video');
//       tempVideo.preload = 'auto';
//       tempVideo.src = nextPart.blobUrl;
//       tempVideo.load();
//
//       setTimeout(() => tempVideo.remove(), 5000);
//     }
//   }
//
//   private async onVideoEnded() {
//     console.log(`Part ${this.currentPartIndex + 1} ended`);
//
//     const nextPartIndex = this.currentPartIndex + 1;
//     if (nextPartIndex < this.parts.length) {
//       // انتقال نرم به پارت بعدی
//       await new Promise(resolve => setTimeout(resolve, 100));
//
//       // پخش پارت بعدی
//       await this.playPart(nextPartIndex, true);
//     }
//   }
//
//   private onVideoPlaying() {
//     console.log(`Part ${this.currentPartIndex + 1} playing`);
//
//     // اطمینان از اینکه صدا فعال است
//     if (this.video.muted && this.userHasInteracted) {
//       this.video.muted = false;
//     }
//   }
//
//   private onVideoCanPlay() {
//     console.log('Video can play');
//   }
//
//   private onVideoLoaded() {
//     console.log('Video metadata loaded');
//   }
//
//   private startTimeUpdate() {
//     if (this.updateInterval) {
//       clearInterval(this.updateInterval);
//     }
//
//     this.updateInterval = setInterval(() => {
//       if (!this.video.paused && !this.isDragging && !this.isSeeking) {
//         this.updateVideoTime();
//       }
//     }, 1000);
//   }
//
//   private formatTime(seconds: number): string {
//     const totalSeconds = Math.floor(seconds);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//
//     if (hours > 0) {
//       return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   }
//
//   private formatBytes(bytes: number): string {
//     if (bytes === 0) return '0 B';
//     const k = 1024;
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
//   }
//
//   private createTimelineSteps() {
//     const totalSeconds = Math.floor(this.totalDuration);
//     const step = Math.max(1, Math.floor(totalSeconds / 50));
//     this.timelineSteps = [];
//
//     for (let i = 0; i <= totalSeconds; i += step) {
//       this.timelineSteps.push(i);
//     }
//
//     if (this.timelineSteps[this.timelineSteps.length - 1] !== totalSeconds) {
//       this.timelineSteps.push(totalSeconds);
//     }
//   }
//
//   // ---- کنترل‌های UI ----
//
//   togglePlay() {
//     if (!this.userHasInteracted) {
//       this.userHasInteracted = true;
//     }
//
//     if (this.video.paused) {
//       this.safePlay();
//     } else {
//       this.video.pause();
//     }
//   }
//
//   // کلیک روی timeline
//   onTimelineClick(event: MouseEvent) {
//     this.handleTimelineSeek(event, false);
//   }
//
//   // شروع درگ روی timeline
//   onTimelineMouseDown(event: MouseEvent) {
//     event.preventDefault();
//     this.isDragging = true;
//
//     // اضافه کردن event listeners
//     const mouseMoveHandler = (e: MouseEvent) => {
//       this.onTimelineMove(e);
//     };
//
//     const mouseUpHandler = () => {
//       this.onMouseUp();
//     };
//
//     document.addEventListener('mousemove', mouseMoveHandler);
//     document.addEventListener('mouseup', mouseUpHandler, { once: true });
//
//     // ذخیره handlers
//     this.mouseMoveHandler = mouseMoveHandler;
//     this.mouseUpHandler = mouseUpHandler;
//
//     // اعمال seek اولیه
//     this.handleTimelineSeek(event, true);
//   }
//
//   // حرکت mouse هنگام درگ
//   private onTimelineMove(event: MouseEvent) {
//     if (!this.isDragging) return;
//     this.handleTimelineSeek(event, true);
//   }
//
//   // پایان درگ
//   private onMouseUp() {
//     this.isDragging = false;
//     this.cleanupMouseListeners();
//   }
//
//   // پاک کردن event listeners
//   private cleanupMouseListeners() {
//     if (this.mouseMoveHandler) {
//       document.removeEventListener('mousemove', this.mouseMoveHandler);
//       this.mouseMoveHandler = null;
//     }
//     if (this.mouseUpHandler) {
//       document.removeEventListener('mouseup', this.mouseUpHandler);
//       this.mouseUpHandler = null;
//     }
//   }
//
//   // هندل seek روی timeline
//   private async handleTimelineSeek(event: MouseEvent, isDragging: boolean) {
//     const timelineElement = event.currentTarget as HTMLElement;
//     const rect = timelineElement.getBoundingClientRect();
//
//     // محاسبه موقعیت کلیک نسبت به timeline
//     const clickX = event.clientX - rect.left;
//     const percent = Math.max(0, Math.min(clickX / rect.width, 1));
//
//     // آپدیت پیشرفت بصری
//     this.progressPercent = percent * 100;
//
//     // محاسبه زمان هدف
//     const targetTime = percent * this.totalDuration;
//     this.currentTime = targetTime;
//     this.formattedTime = this.formatTime(targetTime);
//
//     console.log(`Timeline ${isDragging ? 'drag' : 'click'}: ${percent.toFixed(2)}%, target time: ${targetTime.toFixed(1)}s`);
//
//     // اگر در حال درگ نیستیم یا درگ تمام شده، seek کن
//     if (!isDragging || !this.isDragging) {
//       await this.seekToTimeImmediately(targetTime);
//     }
//   }
//
//   // seek فوری به زمان مشخص (بدون منتظر ماندن برای دانلود)
//   private async seekToTimeImmediately(targetTime: number) {
//     if (this.isSeeking) return;
//
//     this.isSeeking = true;
//     console.log(`Immediate seek to: ${targetTime.toFixed(1)}s`);
//
//     try {
//       // وضعیت فعلی
//       const wasPlaying = !this.video.paused;
//
//       // پیدا کردن پارت مربوطه
//       for (let i = 0; i < this.parts.length; i++) {
//         const part = this.parts[i];
//         if (targetTime >= part.startTime && targetTime < part.endTime) {
//           const timeInPart = targetTime - part.startTime;
//
//           console.log(`Found in part ${i + 1}, time in part: ${timeInPart.toFixed(1)}s`);
//
//           if (i !== this.currentPartIndex) {
//             // تغییر پارت با seek فوری
//             console.log(`Switching to part ${i + 1} immediately`);
//             const shouldPlay = await this.switchPartForSeek(i);
//
//             // منتظر بمان تا ویدیو آماده شود
//             await new Promise<void>((resolve) => {
//               const canPlayHandler = () => {
//                 this.video.removeEventListener('canplay', canPlayHandler);
//                 resolve();
//               };
//
//               if (this.video.readyState >= 3) {
//                 resolve();
//               } else {
//                 this.video.addEventListener('canplay', canPlayHandler);
//                 // timeout برای جلوگیری از block شدن
//                 setTimeout(resolve, 1000);
//               }
//             });
//
//             // تنظیم زمان
//             this.video.currentTime = Math.min(timeInPart, part.duration - 0.1);
//             console.log(`Set currentTime to: ${this.video.currentTime}s`);
//
//             // اگر در حال پخش بود، ادامه بده
//             if (shouldPlay) {
//               setTimeout(() => {
//                 this.safePlay();
//               }, 100);
//             }
//           } else {
//             // همان پارت - فقط seek کن
//             this.video.currentTime = Math.min(timeInPart, part.duration - 0.1);
//             console.log(`Set currentTime to: ${this.video.currentTime}s`);
//
//             // اگر در حال پخش بود، ادامه بده
//             if (wasPlaying && this.video.paused) {
//               setTimeout(() => {
//                 this.safePlay();
//               }, 100);
//             }
//           }
//           break;
//         }
//       }
//     } catch (error) {
//       console.error('Error during seek:', error);
//     } finally {
//       // کمی تاخیر قبل از آپدیت مجدد timeupdate
//       setTimeout(() => {
//         this.isSeeking = false;
//       }, 500);
//     }
//   }
//
//   changeVolume(event: Event) {
//     const input = event.target as HTMLInputElement;
//     const volume = parseFloat(input.value);
//     this.video.volume = volume;
//
//     // اگر صدا بیشتر از صفر است و ویدیو mute شده، unmute کن
//     if (volume > 0 && this.video.muted) {
//       this.video.muted = false;
//     }
//   }
//
//   skip(seconds: number) {
//     const currentTime = this.video.currentTime;
//     const newTime = currentTime + seconds;
//     const currentPart = this.parts[this.currentPartIndex];
//
//     if (currentPart) {
//       const wasPlaying = !this.video.paused;
//
//       if (newTime < 0 && this.currentPartIndex > 0) {
//         // رفتن به پارت قبلی
//         const prevPartIndex = this.currentPartIndex - 1;
//         const prevPart = this.parts[prevPartIndex];
//         const timeInPrevPart = prevPart.duration + newTime; // newTime منفی است
//
//         this.switchPartForSeek(prevPartIndex).then((shouldPlay) => {
//           this.video.currentTime = Math.max(0, timeInPrevPart);
//           if (shouldPlay) {
//             setTimeout(() => this.safePlay(), 100);
//           }
//         });
//
//       } else if (newTime > currentPart.duration && this.currentPartIndex < this.parts.length - 1) {
//         // رفتن به پارت بعدی
//         const nextPartIndex = this.currentPartIndex + 1;
//         const timeInNextPart = newTime - currentPart.duration;
//
//         this.switchPartForSeek(nextPartIndex).then((shouldPlay) => {
//           this.video.currentTime = Math.min(timeInNextPart, this.parts[nextPartIndex].duration);
//           if (shouldPlay) {
//             setTimeout(() => this.safePlay(), 100);
//           }
//         });
//
//       } else {
//         // ماندن در همان پارت
//         this.video.currentTime = Math.max(0, Math.min(newTime, currentPart.duration));
//
//         // اگر در حال پخش بود و بعد از skip هنوز pause است، پلی کن
//         if (wasPlaying && this.video.paused) {
//           setTimeout(() => {
//             this.safePlay();
//           }, 50);
//         }
//       }
//     }
//   }
//
//   getReadyPartsCount(): number {
//     return this.parts.filter(p => p.state === 'ready').length;
//   }
//
//   getDownloadingPartsCount(): number {
//     return this.parts.filter(p => p.state === 'downloading').length;
//   }
//
//   ngOnDestroy() {
//     if (this.updateInterval) {
//       clearInterval(this.updateInterval);
//     }
//
//     if (this.preloadTimeout) {
//       clearTimeout(this.preloadTimeout);
//     }
//
//     // پاک کردن event listeners
//     this.cleanupMouseListeners();
//
//     this.activeDownloads.clear();
//
//     this.parts.forEach(part => {
//       if (part.blobUrl) {
//         URL.revokeObjectURL(part.blobUrl);
//       }
//     });
//   }
// }
//



import { Component, ElementRef, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from "@angular/forms";

// interface VideoPart {
//   partIndex: number;
//   duration: number;
//   startTime: number;
//   endTime: number;
//   fileUrl: string;
//   blobUrl: string;
//   state: 'idle' | 'downloading' | 'ready' | 'error';
//   blob: Blob | null;
//   loadedBytes: number;
//   totalBytes: number;
// }

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  standalone: true,
  imports: [NgForOf, NgClass, FormsModule, NgIf, DecimalPipe],
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
//   @ViewChild('videoEl', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
//   @ViewChild('timelineBar', { static: false }) timelineBarRef!: ElementRef<HTMLDivElement>;

//   video!: HTMLVideoElement;

//   mediaId = 510765;
//   parts: VideoPart[] = [];
//   progressPercent = 0;
//   currentPartIndex = 0;
//   totalDuration = 0;

//   currentTime = 0;
//   formattedTime = '00:00';
//   totalFormattedTime = '00:00';

//   // وضعیت‌ها
//   downloadingPart: number | null = null;
//   downloadProgress = 0;
//   userHasInteracted = false;

//   // کنترل‌ها
//   private preloadTimeout: any;
//   private updateInterval: any;
//   isDragging = false;
//   timelineSteps: number[] = [];

//   // مدیریت دانلود
//   private maxConcurrentDownloads = 2;
//   private activeDownloads = new Set<number>();

//   // برای مدیریت event handlers
//   private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
//   private mouseUpHandler: (() => void) | null = null;

//   // برای مدیریت seek فوری
//   private isSeeking = false;
//   private pendingSeekTime: number | null = null;
//   private pendingSeekPartIndex: number | null = null;

//   constructor(private http: HttpClient) {}

//   async ngOnInit() {
//     this.video = this.videoRef.nativeElement;
//     this.video.controls = false;
//     this.video.volume = 0.8;
//     this.video.muted = false;

//     // رویدادهای ویدیو
//     this.setupVideoEvents();

//     await this.loadParts();
//     await this.initializePlayer();

//     this.startTimeUpdate();
//   }

//   // تنظیم رویدادهای ویدیو
//   private setupVideoEvents() {
//     this.video.addEventListener('timeupdate', () => this.updateVideoTime());
//     this.video.addEventListener('ended', () => this.onVideoEnded());
//     this.video.addEventListener('playing', () => this.onVideoPlaying());
//     this.video.addEventListener('canplay', () => this.onVideoCanPlay());
//     this.video.addEventListener('loadedmetadata', () => this.onVideoLoaded());
//     this.video.addEventListener('seeked', () => this.onVideoSeeked());
//     this.video.addEventListener('error', (e) => this.onVideoError(e));
//   }

//   // گوش دادن به کلیک کاربر در کل صفحه
//   @HostListener('document:click', ['$event'])
//   onDocumentClick() {
//     if (!this.userHasInteracted) {
//       this.userHasInteracted = true;
//       console.log('User has interacted with document');
//     }
//   }

//   async loadParts() {
//     try {
//       const partsData: any = await this.http
//         .get(`https://api.openr.ir/mediaapi/api/v1/ParticleMedia/GetAllPartMedia?idMedia=${this.mediaId}`, {
//           headers: { IDMedia: this.mediaId.toString() }
//         })
//         .toPromise();

//       let startTime = 0;
//       this.parts = partsData.data.map((p: any) => {
//         const duration = p.durationPart;
//         const endTime = startTime + duration;
//         const part = {
//           partIndex: p.partNumber,
//           duration: duration,
//           startTime,
//           endTime,
//           fileUrl: `https://api.openr.ir/mediaapi/api/File/DownloadFilePartVideo?IDMedia=${this.mediaId}&index=${p.partNumber}`,
//           blobUrl: '',
//           state: 'idle' as const,
//           blob: null,
//           loadedBytes: 0,
//           totalBytes: 0
//         };
//         console.log(`Part ${p.partNumber}: start=${startTime.toFixed(1)}s, end=${endTime.toFixed(1)}s, duration=${duration}s`);
//         startTime = endTime;
//         return part;
//       });

//       this.totalDuration = startTime;
//       console.log(`Total duration: ${this.totalDuration}s`);
//       this.totalFormattedTime = this.formatTime(this.totalDuration);
//       this.createTimelineSteps();

//     } catch (error) {
//       console.error('Error loading parts:', error);
//     }
//   }

//   async initializePlayer() {
//     if (this.parts.length === 0) return;

//     // فقط پارت اول را دانلود کن
//     await this.downloadPart(0);

//     // پخش پارت اول
//     await this.playPart(0, false);
//   }

//   private async downloadPart(partIndex: number): Promise<boolean> {
//     if (partIndex >= this.parts.length) return false;

//     const part = this.parts[partIndex];
//     if (part.state === 'ready' || part.state === 'downloading') {
//       return part.state === 'ready';
//     }

//     if (this.activeDownloads.size >= this.maxConcurrentDownloads) {
//       return false;
//     }

//     part.state = 'downloading';
//     this.downloadingPart = partIndex;
//     this.activeDownloads.add(partIndex);

//     try {
//       const response = await fetch(part.fileUrl);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);

//       const contentLength = response.headers.get('content-length');
//       part.totalBytes = contentLength ? parseInt(contentLength) : 0;

//       const blob = await response.blob();
//       const blobUrl = URL.createObjectURL(blob);

//       part.blob = blob;
//       part.blobUrl = blobUrl;
//       part.state = 'ready';

//       console.log(`Part ${partIndex + 1} downloaded successfully`);

//       // اگر seek معلقی برای این پارت داریم، اعمال کن
//       if (this.pendingSeekPartIndex === partIndex && this.pendingSeekTime !== null) {
//         console.log(`Applying pending seek for part ${partIndex + 1} to ${this.pendingSeekTime}s`);
//         if (this.currentPartIndex === partIndex) {
//           this.video.currentTime = this.pendingSeekTime;
//         }
//         this.clearPendingSeek();
//       }

//       return true;

//     } catch (error) {
//       console.error(`Error downloading part ${partIndex + 1}:`, error);
//       part.state = 'error';
//       return false;
//     } finally {
//       this.activeDownloads.delete(partIndex);
//       this.downloadingPart = null;
//       this.downloadProgress = 0;
//     }
//   }

//   // پاک کردن seek معلق
//   private clearPendingSeek() {
//     this.pendingSeekTime = null;
//     this.pendingSeekPartIndex = null;
//   }

//   // پخش یک پارت (برای پخش عادی)
//   async playPart(partIndex: number, autoplay = false): Promise<boolean> {
//     console.log(`playPart called: part ${partIndex + 1}, autoplay: ${autoplay}`);

//     if (partIndex < 0 || partIndex >= this.parts.length) {
//       return false;
//     }

//     const part = this.parts[partIndex];
//     if (!part) return false;

//     // تغییر پارت فعلی
//     this.currentPartIndex = partIndex;

//     // اگر پارت آماده نیست، دانلودش کن
//     if (part.state !== 'ready') {
//       const success = await this.downloadPart(partIndex);
//       if (!success) return false;
//     }

//     // تنظیم src
//     if (part.blobUrl) {
//       this.video.src = part.blobUrl;
//     } else {
//       this.video.src = part.fileUrl;
//     }

//     this.video.load();

//     // شروع دانلود پارت بعدی بلافاصله
//     this.scheduleNextPartDownload(partIndex);

//     // پخش
//     if (autoplay) {
//       await this.safePlay();
//     }

//     return true;
//   }

//   // تغییر پارت برای seek فوری
//   private async switchPartForSeek(partIndex: number, targetTime: number): Promise<boolean> {
//     console.log(`switchPartForSeek called: part ${partIndex + 1}, targetTime: ${targetTime}s`);

//     if (partIndex < 0 || partIndex >= this.parts.length) {
//       return false;
//     }

//     const part = this.parts[partIndex];
//     if (!part) return false;

//     // ذخیره وضعیت پخش فعلی
//     const wasPlaying = !this.video.paused;

//     // متوقف کردن پخش فعلی
//     this.video.pause();

//     // تغییر پارت فعلی
//     this.currentPartIndex = partIndex;

//     // محاسبه زمان درون پارت
//     const timeInPart = Math.max(0, Math.min(targetTime - part.startTime, part.duration - 0.1));
//     console.log(`Time in part ${partIndex + 1}: ${timeInPart.toFixed(1)}s`);

//     // اگر پارت آماده است، از blob استفاده کن
//     if (part.state === 'ready' && part.blobUrl) {
//       this.video.src = part.blobUrl;
//       console.log(`Using blob for part ${partIndex + 1}`);

//       // وقتی metadata لود شد، زمان را تنظیم کن
//       const onLoadedMetadata = () => {
//         this.video.removeEventListener('loadedmetadata', onLoadedMetadata);
//         this.video.currentTime = timeInPart;
//         console.log(`Set currentTime to: ${timeInPart.toFixed(1)}s after metadata loaded`);
//       };

//       this.video.addEventListener('loadedmetadata', onLoadedMetadata);
//     } else {
//       // اگر آماده نیست، از URL اصلی استفاده کن
//       this.video.src = part.fileUrl;
//       console.log(`Using direct URL for part ${partIndex + 1}`);

//       // ذخیره seek معلق
//       this.pendingSeekTime = timeInPart;
//       this.pendingSeekPartIndex = partIndex;

//       // شروع دانلود این پارت در پس‌زمینه
//       this.downloadPartInBackground(partIndex);

//       // برای URL مستقیم، وقتی enough data داشت، seek کن
//       const onCanPlay = () => {
//         this.video.removeEventListener('canplay', onCanPlay);
//         if (this.pendingSeekPartIndex === partIndex) {
//           this.video.currentTime = timeInPart;
//           console.log(`Set currentTime to: ${timeInPart.toFixed(1)}s after canplay`);
//           this.clearPendingSeek();
//         }
//       };

//       this.video.addEventListener('canplay', onCanPlay);

//       // fallback: بعد از 2 ثانیه
//       setTimeout(() => {
//         if (this.pendingSeekPartIndex === partIndex) {
//           this.video.currentTime = timeInPart;
//           console.log(`Set currentTime to: ${timeInPart.toFixed(1)}s after timeout`);
//           this.clearPendingSeek();
//         }
//       }, 2000);
//     }

//     this.video.load();

//     // شروع دانلود پارت بعدی
//     this.scheduleNextPartDownload(partIndex);

//     return wasPlaying;
//   }

//   // دانلود در پس‌زمینه
//   private downloadPartInBackground(partIndex: number) {
//     if (partIndex >= this.parts.length) return;

//     const part = this.parts[partIndex];
//     if (part.state !== 'idle') return;

//     // با تاخیر کمی دانلود را شروع کن تا seek اولیه انجام شود
//     setTimeout(() => {
//       this.downloadPart(partIndex);
//     }, 1000);
//   }

//   // پخش امن ویدیو بدون خطا
//   private async safePlay(): Promise<boolean> {
//     try {
//       await this.video.play();
//       console.log('Video playing successfully');
//       return true;
//     } catch (error: any) {
//       console.warn('Play failed:', error.message);

//       if (error.name === 'NotAllowedError') {
//         try {
//           console.log('Trying muted autoplay...');
//           this.video.muted = true;
//           await this.video.play();
//           console.log('Video playing with muted audio');

//           // وقتی کاربر کلیک کرد، صدا را برگردان
//           const unmuteOnClick = () => {
//             if (this.userHasInteracted) {
//               this.video.muted = false;
//               document.removeEventListener('click', unmuteOnClick);
//             }
//           };
//           document.addEventListener('click', unmuteOnClick);

//           return true;
//         } catch (mutedError) {
//           console.error('Muted autoplay also failed:', mutedError);
//         }
//       }

//       return false;
//     }
//   }

//   private scheduleNextPartDownload(currentPartIndex: number) {
//     const nextPartIndex = currentPartIndex + 1;

//     if (this.preloadTimeout) {
//       clearTimeout(this.preloadTimeout);
//     }

//     this.preloadTimeout = setTimeout(() => {
//       this.downloadNextPartIfNeeded(nextPartIndex);
//     }, 300);
//   }

//   private async downloadNextPartIfNeeded(nextPartIndex: number) {
//     if (nextPartIndex >= this.parts.length) return;

//     const nextPart = this.parts[nextPartIndex];
//     if (!nextPart || nextPart.state === 'ready' || nextPart.state === 'downloading') {
//       return;
//     }

//     console.log(`Starting download of next part ${nextPartIndex + 1}`);
//     await this.downloadPart(nextPartIndex);
//   }

//   private updateVideoTime() {
//     if (!this.parts.length || !this.video || this.isSeeking) return;

//     const currentPart = this.parts[this.currentPartIndex];
//     if (!currentPart) return;

//     // محاسبه زمان کل سپری شده
//     let totalElapsed = 0;
//     for (let i = 0; i < this.currentPartIndex; i++) {
//       totalElapsed += this.parts[i].duration;
//     }
//     totalElapsed += this.video.currentTime;

//     // ذخیره زمان
//     this.currentTime = totalElapsed;
//     this.formattedTime = this.formatTime(totalElapsed);

//     // محاسبه درصد پیشرفت
//     if (this.totalDuration > 0) {
//       this.progressPercent = (totalElapsed / this.totalDuration) * 100;
//     }

//     // اگر نزدیک پایان پارت هستیم
//     if (currentPart.duration - this.video.currentTime < 3) {
//       const nextPartIndex = this.currentPartIndex + 1;
//       if (nextPartIndex < this.parts.length) {
//         const nextPart = this.parts[nextPartIndex];

//         if (nextPart.state === 'idle' && !this.activeDownloads.has(nextPartIndex)) {
//           this.downloadPart(nextPartIndex);
//         }

//         // اگر کمتر از 1 ثانیه مانده، انتقال را آماده کن
//         if (currentPart.duration - this.video.currentTime < 1) {
//           this.prepareNextPartTransition(nextPartIndex);
//         }
//       }
//     }
//   }

//   private prepareNextPartTransition(nextPartIndex: number) {
//     const nextPart = this.parts[nextPartIndex];
//     if (nextPart.state === 'ready' && nextPart.blobUrl) {
//       // pre-buffer ساده
//       const tempVideo = document.createElement('video');
//       tempVideo.preload = 'auto';
//       tempVideo.src = nextPart.blobUrl;
//       tempVideo.load();

//       setTimeout(() => tempVideo.remove(), 5000);
//     }
//   }

//   private async onVideoEnded() {
//     console.log(`Part ${this.currentPartIndex + 1} ended`);

//     const nextPartIndex = this.currentPartIndex + 1;
//     if (nextPartIndex < this.parts.length) {
//       // انتقال نرم به پارت بعدی
//       await new Promise(resolve => setTimeout(resolve, 100));

//       // پخش پارت بعدی
//       await this.playPart(nextPartIndex, true);
//     }
//   }

//   private onVideoPlaying() {
//     console.log(`Part ${this.currentPartIndex + 1} playing`);

//     // اطمینان از اینکه صدا فعال است
//     if (this.video.muted && this.userHasInteracted) {
//       this.video.muted = false;
//     }
//   }

//   private onVideoCanPlay() {
//     console.log('Video can play');
//   }

//   private onVideoLoaded() {
//     console.log('Video metadata loaded');
//   }

//   private onVideoSeeked() {
//     console.log('Video seeked');
//     this.clearPendingSeek();
//   }

//   private onVideoError(event: any) {
//     console.error('Video error:', event);
//     console.error('Video error details:', this.video.error);
//   }

//   private startTimeUpdate() {
//     if (this.updateInterval) {
//       clearInterval(this.updateInterval);
//     }

//     this.updateInterval = setInterval(() => {
//       if (!this.video.paused && !this.isDragging && !this.isSeeking) {
//         this.updateVideoTime();
//       }
//     }, 1000);
//   }

//   private formatTime(seconds: number): string {
//     const totalSeconds = Math.floor(seconds);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;

//     if (hours > 0) {
//       return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   }

//   private createTimelineSteps() {
//     const totalSeconds = Math.floor(this.totalDuration);
//     const step = Math.max(1, Math.floor(totalSeconds / 50));
//     this.timelineSteps = [];

//     for (let i = 0; i <= totalSeconds; i += step) {
//       this.timelineSteps.push(i);
//     }

//     if (this.timelineSteps[this.timelineSteps.length - 1] !== totalSeconds) {
//       this.timelineSteps.push(totalSeconds);
//     }
//   }

//   // ---- کنترل‌های UI ----

//   togglePlay() {
//     if (!this.userHasInteracted) {
//       this.userHasInteracted = true;
//     }

//     if (this.video.paused) {
//       this.safePlay();
//     } else {
//       this.video.pause();
//     }
//   }

//   // کلیک روی timeline
//   onTimelineClick(event: MouseEvent) {
//     this.handleTimelineSeek(event, false);
//   }

//   // شروع درگ روی timeline
//   onTimelineMouseDown(event: MouseEvent) {
//     event.preventDefault();
//     this.isDragging = true;

//     // اضافه کردن event listeners
//     const mouseMoveHandler = (e: MouseEvent) => {
//       this.onTimelineMove(e);
//     };

//     const mouseUpHandler = () => {
//       this.onMouseUp();
//     };

//     document.addEventListener('mousemove', mouseMoveHandler);
//     document.addEventListener('mouseup', mouseUpHandler, { once: true });

//     // ذخیره handlers
//     this.mouseMoveHandler = mouseMoveHandler;
//     this.mouseUpHandler = mouseUpHandler;

//     // اعمال seek اولیه
//     this.handleTimelineSeek(event, true);
//   }

//   // حرکت mouse هنگام درگ
//   private onTimelineMove(event: MouseEvent) {
//     if (!this.isDragging) return;
//     this.handleTimelineSeek(event, true);
//   }

//   // پایان درگ
//   private onMouseUp() {
//     this.isDragging = false;
//     this.cleanupMouseListeners();
//   }

//   // پاک کردن event listeners
//   private cleanupMouseListeners() {
//     if (this.mouseMoveHandler) {
//       document.removeEventListener('mousemove', this.mouseMoveHandler);
//       this.mouseMoveHandler = null;
//     }
//     if (this.mouseUpHandler) {
//       document.removeEventListener('mouseup', this.mouseUpHandler);
//       this.mouseUpHandler = null;
//     }
//   }

//   // هندل seek روی timeline
//   private async handleTimelineSeek(event: MouseEvent, isDragging: boolean) {
//     try {
//       let timelineElement: HTMLElement | null = null;

//       if (this.timelineBarRef && this.timelineBarRef.nativeElement) {
//         timelineElement = this.timelineBarRef.nativeElement;
//       } else if (event.currentTarget instanceof HTMLElement) {
//         timelineElement = event.currentTarget;
//       } else {
//         return;
//       }

//       const rect = timelineElement.getBoundingClientRect();

//       // محاسبه موقعیت کلیک
//       const clickX = event.clientX - rect.left;
//       const percent = Math.max(0, Math.min(clickX / rect.width, 1));

//       // آپدیت پیشرفت بصری
//       this.progressPercent = percent * 100;

//       // محاسبه زمان هدف
//       const targetTime = percent * this.totalDuration;
//       this.currentTime = targetTime;
//       this.formattedTime = this.formatTime(targetTime);

//       console.log(`Timeline ${isDragging ? 'drag' : 'click'}: ${percent.toFixed(2)}%, target time: ${targetTime.toFixed(1)}s`);

//       // اگر در حال درگ نیستیم یا درگ تمام شده، seek کن
//       if (!isDragging || !this.isDragging) {
//         await this.seekToTimeImmediately(targetTime);
//       }
//     } catch (error) {
//       console.error('Error in handleTimelineSeek:', error);
//     }
//   }

//   // پیدا کردن پارت بر اساس زمان
//   private findPartByTime(targetTime: number): { partIndex: number, timeInPart: number } | null {
//     for (let i = 0; i < this.parts.length; i++) {
//       const part = this.parts[i];
//       if (targetTime >= part.startTime && targetTime <= part.endTime) {
//         const timeInPart = Math.max(0, Math.min(targetTime - part.startTime, part.duration - 0.1));
//         return { partIndex: i, timeInPart };
//       }
//     }
//     return null;
//   }

//   // seek فوری به زمان مشخص
//   private async seekToTimeImmediately(targetTime: number) {
//     if (this.isSeeking) return;

//     this.isSeeking = true;
//     console.log(`Immediate seek to: ${targetTime.toFixed(1)}s`);

//     try {
//       // وضعیت فعلی
//       const wasPlaying = !this.video.paused;

//       // پیدا کردن پارت مربوطه
//       const partInfo = this.findPartByTime(targetTime);
//       if (!partInfo) {
//         console.error(`No part found for time ${targetTime}s`);
//         return;
//       }

//       const { partIndex, timeInPart } = partInfo;
//       const part = this.parts[partIndex];

//       console.log(`Found in part ${partIndex + 1}, time in part: ${timeInPart.toFixed(1)}s`);

//       if (partIndex !== this.currentPartIndex) {
//         // تغییر پارت
//         console.log(`Switching to part ${partIndex + 1}`);
//         const shouldPlay = await this.switchPartForSeek(partIndex, targetTime);

//         // اگر در حال پخش بود، ادامه بده
//         if (shouldPlay) {
//           setTimeout(() => {
//             this.safePlay();
//           }, 500);
//         }
//       } else {
//         // همان پارت
//         this.video.currentTime = timeInPart;
//         console.log(`Set currentTime to: ${timeInPart.toFixed(1)}s`);

//         // اگر در حال پخش بود، ادامه بده
//         if (wasPlaying && this.video.paused) {
//           setTimeout(() => {
//             this.safePlay();
//           }, 100);
//         }
//       }
//     } catch (error) {
//       console.error('Error during seek:', error);
//     } finally {
//       setTimeout(() => {
//         this.isSeeking = false;
//       }, 500);
//     }
//   }

//   changeVolume(event: Event) {
//     const input = event.target as HTMLInputElement;
//     const volume = parseFloat(input.value);
//     this.video.volume = volume;

//     if (volume > 0 && this.video.muted) {
//       this.video.muted = false;
//     }
//   }

//   skip(seconds: number) {
//     const currentTime = this.video.currentTime;
//     const newTime = currentTime + seconds;
//     const currentPart = this.parts[this.currentPartIndex];

//     if (currentPart) {
//       const wasPlaying = !this.video.paused;

//       if (newTime < 0 && this.currentPartIndex > 0) {
//         const prevPartIndex = this.currentPartIndex - 1;
//         const prevPart = this.parts[prevPartIndex];
//         const timeInPrevPart = prevPart.duration + newTime;

//         this.switchPartForSeek(prevPartIndex, prevPart.startTime + Math.max(0, timeInPrevPart)).then((shouldPlay) => {
//           if (shouldPlay) {
//             setTimeout(() => this.safePlay(), 100);
//           }
//         });

//       } else if (newTime > currentPart.duration && this.currentPartIndex < this.parts.length - 1) {
//         const nextPartIndex = this.currentPartIndex + 1;
//         const timeInNextPart = newTime - currentPart.duration;

//         this.switchPartForSeek(nextPartIndex, this.parts[nextPartIndex].startTime + timeInNextPart).then((shouldPlay) => {
//           if (shouldPlay) {
//             setTimeout(() => this.safePlay(), 100);
//           }
//         });

//       } else {
//         this.video.currentTime = Math.max(0, Math.min(newTime, currentPart.duration));

//         if (wasPlaying && this.video.paused) {
//           setTimeout(() => {
//             this.safePlay();
//           }, 50);
//         }
//       }
//     }
//   }

//   getReadyPartsCount(): number {
//     return this.parts.filter(p => p.state === 'ready').length;
//   }

//   ngOnDestroy() {
//     if (this.updateInterval) {
//       clearInterval(this.updateInterval);
//     }

//     if (this.preloadTimeout) {
//       clearTimeout(this.preloadTimeout);
//     }

//     this.cleanupMouseListeners();
//     this.activeDownloads.clear();

//     this.parts.forEach(part => {
//       if (part.blobUrl) {
//         URL.revokeObjectURL(part.blobUrl);
//       }
//     });
//   }
}
