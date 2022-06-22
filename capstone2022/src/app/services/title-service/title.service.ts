import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private http: HttpClient) { }

  getAll(index: number, size: number) {
    return this.http.post(`https://localhost:44376/api/OrgnizationAPI/GetAllTitle?index=${index}&size=${size}`, {})
  }

  insertTitle(request: any) {
    return this.http.post(
      'https://localhost:44376/api/OrgnizationAPI/InsertTitle',
      request
    );
  }
  modifyTitle(request: any) {
    return this.http.post(
      'https://localhost:44376/api/OrgnizationAPI/ModifyTitle',
      request
    );
  }

  deleteTitle(arr: Array<number>) {
    return this.http.post(
      'https://localhost:44376/api/OrgnizationAPI/DeleteTitle',
      arr
    );
  }
}
