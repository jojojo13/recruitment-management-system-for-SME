import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-view-employee-pages',
  templateUrl: './view-employee-pages.component.html',
  styleUrls: ['./view-employee-pages.component.scss']
})
export class ViewEmployeePagesComponent implements OnInit {
  route = { name: 'View employee', link: '/thietlaphoso' };
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  isLoaded: boolean = false;
  listemployee: any;
  employeeForm!: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orgService: OrganizationService,
    private router: Router,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.initForm();
    this.isLoaded = false;
    this.page = this.activatedRoute.snapshot.queryParams['index'];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams['size'];
    this.loadData();
  }
  loadData() {
    this.clearData()
    this.orgService
      .getEmployeeByOrgID(1, this.page - 1, this.itemsPerPage)
      .subscribe(
        (response: any) => {
          this.isLoaded = true;
          this.listemployee = response.data;
          this.totalItems = response.totalItem;

        },
        (err) => {
          this.isLoaded = true;
        }
      );
  }
  gty(page: number) {
    this.isLoaded = false;
    this.router.navigateByUrl(
      `/thietlaphoso/nhanvien?index=${page}&size=${this.itemsPerPage}`
    );
    this.clearData();
    this.loadData();
  }
  clearData() {
    this.isLoaded = false
    this.listemployee = null;
  }
  initForm() {
    this.employeeForm = this.fb.group({
      id: [''],
      name: [''],
      yob: [''],
      phone: [''],
      email: [''],
      location: [''],
      position: [''],
      exp: [''],
      languages: [''],
    });
    this.employeeForm.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((selectedValue) => {
        //this.employeeFilter.name = this.employeeForm.controls['name'].value;
        //if (this.employeeForm.controls['yob'].value != '') {
        //  this.employeeFilter.yob = this.employeeForm.controls['yob'].value;
        //}
        //if (this.employeeForm.controls['yob'].value == '') {
        //  this.employeeFilter.yob = 0;
        //}
        //this.employeeFilter.phone = this.employeeForm.controls['phone'].value;
        //this.employeeFilter.email = this.employeeForm.controls['email'].value;
        //this.employeeFilter.location = this.employeeForm.controls['location'].value;
        //this.employeeFilter.position = this.employeeForm.controls['position'].value;
        //this.employeeFilter.yearExp = this.employeeForm.controls['exp'].value;
        //this.employeeFilter.language = this.employeeForm.controls['languages'].value;
        //this.loadData()
      });
  }
  navigateToView(employee: any) {
    this.router.navigateByUrl(`ungvien/xemungvien/info?id=${employee.id}`);
  }
}
