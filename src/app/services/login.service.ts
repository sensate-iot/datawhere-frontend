/*
 * Login service.
 *
 * @author Michel Megens
 * @email  dev@bietje.net
 */

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Jwt} from '../models/jwt.model';
import {CookieService} from 'ngx-cookie-service';
import {ApiKeyService} from './api-key.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public constructor(private readonly http: HttpClient,
                     private readonly cookies: CookieService,
                     private readonly keys: ApiKeyService) {
    this.options = {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    this.host = window.location.hostname;
  }

  private static AuthCookie = 'SensateIoTAuth';
  private readonly host: string;
  private readonly options: any;

  public readAuthCookie() {
    const data = this.cookies.get(LoginService.AuthCookie);

    if (data === null || data.length <= 0) {
      return null;
    }

    const json = atob(data);
    const jwt = JSON.parse(json);

    localStorage.setItem('jwt', json);
    localStorage.setItem('syskey', jwt.systemApiKey);

    return jwt;
  }

  public isLoggedIn(): boolean {
    const jwt = this.readAuthCookie();

    if (jwt === null || jwt === undefined) {
      return false;
    }

    return jwt.refreshToken != null;
  }

  public revokeAllTokens() {
    const jwt = this.getJwt();

    if (jwt == null || jwt.refreshToken == null) {
      this.resetLogin();
      return;
    }

    this.keys.revokeAll(true).subscribe(() => {});

    return new Promise((resolve, reject) => {
      this.http.delete(environment.authApiHost + '/tokens/revoke-all', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Cache-Control', 'no-cache')
      }).subscribe(() => {
        this.resetLogin();
        resolve();
      }, () => {
        console.debug('Unable to revoke all tokens!');
        this.resetLogin();
        reject();
      });
    });
  }

  public logout() {
    return new Promise<void>(resolve => {
      const jwt = this.getJwt();

      if (jwt == null || jwt.refreshToken == null) {
        this.resetLogin();
        return;
      }

      const key = localStorage.getItem('syskey');

      if (key != null) {
        this.keys.revokeByKey(key).subscribe(() => {
          console.debug('System API key revoked!');
        });
      }

      this.http.delete(environment.authApiHost + '/tokens/revoke/' + jwt.refreshToken, {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Cache-Control', 'no-cache')
      }).subscribe(() => {
        this.resetLogin();
        resolve();
      }, () => {
        console.debug('Unable to logout on server!');
        this.resetLogin();
        resolve();
      });
    });
  }

  public getJwt(): Jwt {
    const data = localStorage.getItem('jwt');
    if (!data) {
      return null;
    }

    return JSON.parse(data, (key, value) => {
      if (value !== '') {
        return value;
      }

      const result = new Jwt();
      result.expiresInMinutes = value.expiresInMinutes;
      result.jwtExpiresInMinutes = value.jwtExpiresInMinutes;
      result.jwtToken = value.jwtToken;
      result.refreshToken = value.refreshToken;
      result.email = value.email;
      return result;
    });
  }

  public resetLogin() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('roles');
    localStorage.removeItem('admin');
    localStorage.removeItem('userId');
    localStorage.removeItem('phone-confirmed');
    localStorage.removeItem('syskey');
    console.debug(`Removing cookie!`);
    this.cookies.delete(LoginService.AuthCookie, '/', this.host);
  }

  public getJwtToken() : string {
    const jwt = this.getJwt();

    if(jwt) {
      return jwt.jwtToken;
    }

    return null;
  }
}
