import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl='https://localhost:44376/api/CommonAPI/GetOtherList'


  constructor(private __http:HttpClient) { }

  getOtherList(code:string){
    return this.__http.post('https://localhost:44376/api/CommonAPI/GetOtherList'+`?code=${code}`,{})
  }
}
