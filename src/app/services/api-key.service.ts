/*
 * API key HTTP service.
 *
 * @author Michel Megens
 * @email  michel@michelmegens.net
 */

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiKeyService {
  private readonly options: any;

  constructor(private client: HttpClient) {
    this.options = {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
  }

  public revokeByKey(key: string) {
    return this.client.delete(environment.authApiHost + '/apikeys/revoke?key=' + key, this.options);
  }

  public revokeAll(systemonly: boolean) {
    return this.client.delete(environment.authApiHost + '/apikeys/revoke?system=' + systemonly, this.options);
  }
}
