import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(): Observable<boolean> {
    const accessToken = this.cookieService.get('access_token');
    const tokenExpiration = this.cookieService.get('token_expiration');

    if (accessToken && tokenExpiration) {
      const now = new Date();
      const expirationDate = new Date(tokenExpiration);

      if (now < expirationDate) {
        return of(true);
      } else {
        return this.redirectToLogin();
      }
    } else {
      return this.redirectToLogin();
    }
  }

  private redirectToLogin(): Observable<boolean> {

    const currentUrl = this.router.url;
    const loginUrl = `https://eva.atlas.com.co/core/login?redirect=${'eva.atlas.com.co/midotacion/'}`;

    window.location.href = loginUrl;

    return of(false);
  }
}
