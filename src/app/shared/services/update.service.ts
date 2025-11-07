import {HostListener, Injectable} from '@angular/core';
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";
import { filter, interval, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  deferredPrompt:any;

  @HostListener('window:beforeinstallprompt', ['$event']) onBeforeInstallPrompt(event:any) {
    event.preventDefault();
    this.deferredPrompt = event;
  }

  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      interval(6 * 60 * 60).subscribe(() =>
        this.swUpdate.checkForUpdate().then(() => {
          this.checkForUpdate();
        })
      );
    }
  }

  checkForUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map(evt => ({
          type: 'UPDATE_AVAILABLE',
          current: evt.currentVersion,
          available: evt.latestVersion
        }))).subscribe(event => {
        this.confirmToUpdate();
      })
    }
  }
  confirmToUpdate() {
    setTimeout(()=>{
      window.location.reload()
    },1000)
  }
}
