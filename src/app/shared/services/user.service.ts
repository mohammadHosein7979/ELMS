import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _user = signal<any>(null);

  /** ست کردن کاربر بعد از login یا loadUser */
  setUser(user: any) {
    this._user.set(user);
  }

  /** گرفتن آبجکت کاربر */
  getUser() {
    return this._user();
  }

  /** گرفتن id کاربر */
  get personId(): number | null {
    const user = this._user();
    return user?.personId ?? user?.id ?? null;
  }

  /** پاک کردن اطلاعات کاربر (logout) */
  clear() {
    this._user.set(null);
  }
}
