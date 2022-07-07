import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { BehaviorSubject } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(jsonData: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  baseUrl = 'https://localhost:44376/api/CommonAPI/GetOtherList';
  dataChange: BehaviorSubject<boolean>;
  pdfSrc = '';
  emitBahavior:BehaviorSubject<boolean>
  constructor(
    private __http: HttpClient,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.dataChange = new BehaviorSubject<any>(null);
    this.emitBahavior=new BehaviorSubject<any>(null)
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
