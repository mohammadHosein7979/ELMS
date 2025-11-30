import { Component, OnInit, ElementRef, ViewChild, input, OnDestroy } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { MicroService } from '../../shared/enum/enum';
import { environment } from '../../../environments/environment';
import { NgIf, NgForOf } from "@angular/common";

@Component({
  selector: 'app-video-player',
  standalone: true,
  templateUrl: './video-player.component.html',
  imports: [NgIf, NgForOf],
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent extends BaseService implements OnInit, OnDestroy {
  formatTime(totalDuration: number) {
      throw new Error("Method not implemented.");
  }

  mediaID = input('');
  @ViewChild('videoEl', { static: true }) videoEl!: ElementRef<HTMLVideoElement>;

  parts: any[] = [];
  mediaInfo: any = null;
  totalDuration = 0;
  mediaSource!: MediaSource;
  sourceBuffer!: SourceBuffer;

  ngOnInit() {
    this.loadMediaInfo();
  }

  ngOnDestroy() {
    this.cleanup();
  }

  loadMediaInfo() {
    this.get(`/${MicroService.mediaapi}/MediaInternal/GetMediaInfo`, {}, { IDMedia: this.mediaID() })
      .subscribe({
        next: (res: any) => {
          if (res.data) {
            this.mediaInfo = res.data;
            this.totalDuration = res.data.duration;
            this.loadParts();
          }
        },
        error: (err) => console.error('Error loading media info:', err)
      });
  }

  loadParts() {
    this.get(`/${MicroService.mediaapi}/api/v1/ParticleMedia/GetAllPartMedia`, {}, { IDMedia: this.mediaID() })
      .subscribe({
        next: (res: any) => {
          if (res.data && res.data.length > 0) {
            this.parts = res.data.sort((a: any, b: any) => a.partNumber - b.partNumber);
            this.setupMediaSource();
          }
        },
        error: (err) => console.error('Error loading parts:', err)
      });
  }

  setupMediaSource() {
    const video = this.videoEl?.nativeElement;
    this.mediaSource = new MediaSource();
    video.src = URL.createObjectURL(this.mediaSource);

    this.mediaSource.addEventListener('sourceopen', () => {
      this.sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
      this.appendPart(0);
    });
  }

  appendPart(index: number) {
    if (index >= this.parts.length) {
      this.mediaSource.endOfStream();
      return;
    }

    fetch(this.getVideoUrl(index))
      .then(res => res.arrayBuffer())
      .then(data => {
        this.sourceBuffer.appendBuffer(data);
        this.sourceBuffer.addEventListener('updateend', () => {
          this.appendPart(index + 1);
        }, { once: true });
      })
      .catch(err => console.error('Error fetching part:', index, err));
  }

  private getVideoUrl(index: number): string {
    return `${environment.apiUrl}/${MicroService.mediaapi}/api/File/DownloadFilePartVideo?IDMedia=${this.mediaID()}&index=${index}`;
  }

  private cleanup() {
    const video = this.videoEl?.nativeElement;
    video.src = '';
    if (this.mediaSource) {
      try { this.mediaSource.endOfStream(); } catch {}
    }
  }

// پیدا کردن پارت بر اساس زمان ویدیو (زمان مطلق)
  findPartByAbsoluteTime(time: number) {
    return this.parts.find(part => time >= part.start && time < part.end);
  }

// حرکت به پارت بعدی
  seekToNextPart() {
    const currentPart = this.getCurrentPart();
    const nextIndex = currentPart.index + 1;
    if (nextIndex < this.parts.length) {
      this.seekToPart(nextIndex);
    }
  }

// حرکت به پارت قبلی
  seekToPreviousPart() {
    const currentPart = this.getCurrentPart();
    const prevIndex = currentPart.index - 1;
    if (prevIndex >= 0) {
      this.seekToPart(prevIndex);
    }
  }
  currentPartIndex:any
// رفتن به پارت خاص
  seekToPart(index: number) {
    if (index < 0 || index >= this.parts.length) return;
    const part = this.parts[index];
    const video = this.videoEl?.nativeElement;

    // زمان نسبی داخل ویدیو
    const relativeTime = part.start;
    video.currentTime = relativeTime;

    // بروزرسانی currentPartIndex برای timeline و info
    this.currentPartIndex = index;
  }










  getCurrentAbsoluteTime(): number {
    if (!this.videoEl || !this.videoEl.nativeElement) return 0; // اضافه کردن چک
    const video = this.videoEl.nativeElement;
    const currentTime = video.currentTime;
    const part = this.findPartByAbsoluteTime(currentTime);
    if (!part) return currentTime;
    return part.start + currentTime;
  }

  getCurrentPart() {
    if (!this.videoEl || !this.videoEl.nativeElement) return this.parts[0]; // اضافه کردن چک
    const absTime = this.getCurrentAbsoluteTime();
    return this.parts.find(p => absTime >= p.start && absTime < p.end) || this.parts[0];
  }

  getProgressPercentage(): number {
    if (!this.videoEl || !this.videoEl.nativeElement) return 0; // اضافه کردن چک
    const absTime = this.getCurrentAbsoluteTime();
    return this.totalDuration > 0 ? (absTime / this.totalDuration) * 100 : 0;
  }


}
