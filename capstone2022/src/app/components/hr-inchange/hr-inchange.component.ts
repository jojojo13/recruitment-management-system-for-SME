import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-hr-inchange',
  templateUrl: './hr-inchange.component.html',
  styleUrls: ['./hr-inchange.component.scss']
})
export class HrInchangeComponent implements OnInit {

  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  emp:any
  constructor(public auth:AuthorizeService, public readonly swalTargets: SwalPortalTargets,) { }
  department:any
  ngOnInit(): void {

  }
  showPopUp() {
    this.orgPicker.fire();
  }
  getDataFromPopup(department:any){
    this.department=department
   
  }
  getEmp(emp:any){
    this.emp=emp
  }
}
