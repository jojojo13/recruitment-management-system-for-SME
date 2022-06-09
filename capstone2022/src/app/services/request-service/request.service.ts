import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl='https://localhost:44376/api/RequestAPI/GetAllRequest'
  constructor(private __http:HttpClient) { }

  getRequestByPaging(index:number,size:number){
    return this.__http.post(this.baseUrl,{index,size})
  }
}
