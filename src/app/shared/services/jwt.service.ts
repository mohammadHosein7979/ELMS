import {Injectable} from '@angular/core';

@Injectable()
export class JwtService {
  private readonly localStorage = window.localStorage;
  constructor() {
  }

  getToken(): string {
    return this.localStorage.getItem('accessToken') || '';
  }

  saveToken(token: string): void {
    this.localStorage.setItem('accessToken', token);
  }

  destroyToken(): void {
    this.localStorage.removeItem('accessToken');
  }

  getRefreshToken(): string {
    return this.localStorage.getItem('refreshToken') || '';
  }

  saveRefreshToken(refreshToken: string): void {
    this.localStorage.setItem('refreshToken', refreshToken);
  }

  destroyRefreshToken(): void {
    this.localStorage.removeItem('refreshToken');
  }

  // get expireSession(): number {
  //   return +this.localStorage.getItem('expiresAt');
  // }

  saveExpireSession(time: number): void {
    this.localStorage.setItem('expiresAt', time.toString());
  }

  destroyExpireSession(): void {
    this.localStorage.removeItem('expiresAt');
  }
}
