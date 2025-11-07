import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService{

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: any) {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
