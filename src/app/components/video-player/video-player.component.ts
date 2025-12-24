
import {Component, ElementRef, OnInit, ViewChild, OnDestroy, HostListener, input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from "@angular/forms";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  standalone: true,
  imports: [NgForOf, NgClass, FormsModule, NgIf, DecimalPipe],
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
  session = input<any>()
  constructor(private sanitizer: DomSanitizer) {}

  getSafeVideoUrl(mediaID: number): SafeResourceUrl {
    const url = `https://media.openr.ir/video/${mediaID}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
