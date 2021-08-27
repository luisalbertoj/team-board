import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api: string;

  constructor(private _http: HttpClient) {
    this.api = environment.APP_URL;
  }
  registerUser(user: any) {
    return this._http.post(this.api + 'user/registerUser', user);
  }
}
