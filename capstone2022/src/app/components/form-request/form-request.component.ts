import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-request',
  templateUrl: './form-request.component.html',
  styleUrls: ['./form-request.component.scss'],
})
export class FormRequestComponent implements OnInit {
  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  requestForm!: FormGroup;
  types: any;
  projects: any;
  positions: any;
  levels: any;
  today: string = new Date().toISOString().slice(0, 10);
  departmentID!: number;
  managerID!: number;
  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    public readonly swalTargets: SwalPortalTargets,
    private orgService: OrganizationService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      requestCode: [
        { value: this.requestService.selectedRequest.code, disabled: true },
      ],
      name: [this.requestService.selectedRequest.name, [Validators.required]],
      type: [this.requestService.selectedRequest.typeID],
      dep: [
        this.requestService.selectedRequest.orgnizationID,
        [Validators.required],
      ],
      projects: [
        this.requestService.selectedRequest.projectID,
        [Validators.required],
      ],
      position: [
        this.requestService.selectedRequest.position,
        [Validators.required],
      ],
      quantity: [
        this.requestService.selectedRequest.quantity,
        [Validators.pattern('^[1-9][0-9]*$'), Validators.required],
      ],
      office: [
        { value: this.requestService.selectedRequest.office, disabled: true },
      ],
      deadline: [
        this.reformatDate(this.requestService.selectedRequest.deadline),
      ],
      experience: [this.requestService.selectedRequest.projectname],
      level: [this.requestService.selectedRequest.projectname],
      notes: [this.requestService.selectedRequest.note, Validators.required],
    });

    this.loadData();
  }
  onSubmit() {}
  loadData() {
    this.loadListOfLevel();
    this.loadListOfPosition();
    this.loadListOfProject();
    this.loadListOfType();
  }
  loadListOfType() {
    this.commonService
      .getOtherList('RC_TYPE', 0, 9999)
      .subscribe((response: any) => {
        this.types = response.data;
      });
  }
  loadListOfProject() {
    this.commonService
      .getOtherList('RC_PROJECT', 0, 9999)
      .subscribe((response: any) => {
        console.log(response);
        this.projects = response.data;
      });
  }
  loadListOfPosition() {
    this.orgService.getPositionByOrgID(2).subscribe(
      (response: any) => {
        this.positions = response.data;
      },
      (err) => {}
    );
  }
  loadListOfLevel() {
    this.commonService
      .getOtherList('RC_LEVEL', 0, 9999)
      .subscribe((response: any) => {
        this.levels = response.data;
      });
  }
  showPopUp() {
    this.orgPicker.fire();
  }
  getDataFromPopup(department: any) {
    this.requestForm.controls['dep']?.setValue(department.name);
    this.orgPicker.close();
    this.renderPosition(department.id);
    this.resetPositionField();
    this.departmentID = department.id;
    this.orgService.getOrgByID(department.id).subscribe((response: any) => {
      this.requestForm.controls['office'].setValue(response.data.office);
      this.managerID = response.data.managerID;
    });
  }
  renderPosition(id: number) {
    this.orgService.getPositionByOrgID(id).subscribe(
      (response: any) => {
        this.positions = response.data;
      },
      (err) => {
        Swal.fire('Position for this department is not available ');
        this.requestForm.controls['dep']?.reset();
      }
    );
  }

  resetPositionField() {
    this.requestForm.controls['position']?.reset();
  }
  clearInputField() {
    if (this.requestService.selectedRequest.id != 0) {
    }
  }
  reformatDate(dateStr: string) {
    let dArr = dateStr.split('/'); // ex input "2010-01-18"
    return dArr[2] + '/' + dArr[1] + '/' + dArr[0].substring(2); //ex out: "18/01/10"
  }
}
