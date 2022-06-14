import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private _http:HttpClient) { }

  signIn(account:Account){
    return this._http.post('https://localhost:44376/api/AccountAPI/GetAccount',account)
  }
  

}
