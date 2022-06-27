import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { GridComponent } from '../components/grid/grid.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  baseUrl = 'https://localhost:44376/api/CommonAPI/GetOtherList';
  dataChange: BehaviorSubject<boolean>;
  pdfSrc = '';
  constructor(
    private __http: HttpClient,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.dataChange = new BehaviorSubject<any>(null);
  }

  getOtherList(code: string, index: number, size: number) {
    return this.__http.post(
      `https://localhost:44376/api/CommonAPI/GetOtherList?code=${code}&index=${index}&size=${size}`,
      { code, index, size }
    );
  }

  getAllOtherList(code: string, index: number, size: number) {
    return this.__http.post(
      `https://localhost:44376/api/CommonAPI/GetAllOtherList?code=${code}&index=${index}&size=${size}`,
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

  activeOtherList(arr: Array<number>) {
    return this.__http.post(
      'https://localhost:44376/api/CommonAPI/ActiveOtherList',
      arr
    );
  }

  deactiveOtherList(arr: Array<number>) {
    return this.__http.post(
      'https://localhost:44376/api/CommonAPI/DeactiveOtherList',
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
  popUpConfirmed(msg: string) {}
  atDate(date: string) {
    return date.split('/').join('-');
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }
}
