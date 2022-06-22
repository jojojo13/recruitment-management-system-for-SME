import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private http:HttpClient) { }

  getAll(index:number,size:number){
    return this.http.post('api',{index,size})
  }
  
}
