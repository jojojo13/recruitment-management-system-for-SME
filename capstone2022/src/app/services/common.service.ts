import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  baseUrl = 'https://localhost:44376/api/CommonAPI/GetOtherList';

  constructor(private __http: HttpClient) {}

  getOtherList(code: string, index: number, size: number) {
    return this.__http.post(
      'https://localhost:44376/api/CommonAPI/GetOtherList',
      { code, index, size }
    );
  }
  insertOtherList(obj: any) {
    return this.__http.post(
      'https://localhost:44376/api/CommonAPI/InsertOtherList',
      obj
    );
  }
  autoGencode3Char(table: string, code: string) {
    return this.__http.post(
      'https://localhost:44376/api/CommonAPI/autoGenCode3character',
      { table, code },
      { responseType: 'text' }
    );
  }
  editOtherList(obj: any) {
    return this.__http.put(
      'https://localhost:44376/api/CommonAPI/ModifyOtherList',
      obj
    );
  }
  deleteOtherList(arr: Array<number>) {
    return this.__http.post(
      'https://localhost:44376/api/CommonAPI/DeleteOtherList',
      arr
    );
  }
  popUpSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Successfully',
      showConfirmButton: true,
      timer: 1500,
    });
  }
  popUpFailed(msg: string) {
    Swal.fire({
      icon: 'error',
      title: msg,
      showConfirmButton: true,
    });
  }
  popUpMessage(msg: string) {
    Swal.fire(msg);
  }
  popUpConfirmed(msg:string){
   
  }
  
}
