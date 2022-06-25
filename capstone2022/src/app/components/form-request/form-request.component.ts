import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
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
  setDeadline: any;
  managerID!: number;

  constructor(
    private fb: FormBuilder,
    public requestService: RequestService,
    public readonly swalTargets: SwalPortalTargets,
    private orgService: OrganizationService,
    private commonService: CommonService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.setDeadline = this.reformatDate(
      this.requestService.selectedRequest.deadline
    );
    this.requestForm = this.fb.group({
      requestCode: [
        { value: this.requestService.selectedRequest.code, disabled: true },
      ],
      name: [this.requestService.selectedRequest.name, [Validators.required]],
      type: [this.requestService.selectedRequest.typeID],
      dep: [
        this.requestService.selectedRequest.orgnizationName,
        [Validators.required],
      ],
      projects: [
        this.requestService.selectedRequest.projectID,
        [Validators.required],
      ],
      position: [
        this.requestService.selectedRequest.positionID,
        [Validators.required],
      ],
      quantity: [
        this.requestService.selectedRequest.quantity,
        [Validators.pattern('^[1-9][0-9]*$'), Validators.required],
      ],
      office: [
        { value: this.requestService.selectedRequest.office, disabled: true },
      ],
      deadline: [this.setDeadline, [Validators.required]],
      experience: [
        this.requestService.selectedRequest.experience,
        [Validators.required],
      ],
      level: [this.requestService.selectedRequest.level, Validators.required],
      notes: [this.requestService.selectedRequest.note, Validators.required],
    });

    this.departmentID = this.requestService.selectedRequest.orgnizationID;
    this.managerID = this.requestService.selectedRequest.signID;
    this.loadData();
    this.renderPosition(this.departmentID) 
    this.disableALL();
  }
  onSubmit() {
    let request = {
      id: this.requestService.selectedRequest.id,
      name: this.requestForm.controls['name'].value,
      code: this.requestForm.controls['requestCode'].value,
      requestLevel: this.requestForm.controls['type'].value,
      orgnizationId: this.departmentID,
      positionID: this.requestForm.controls['position'].value,
      number: this.requestForm.controls['quantity'].value,
      signId: this.managerID,
      effectDate: '2022-06-23T08:45:38.630Z',
      expireDate: this.requestForm.controls['deadline'].value,
      yearExperience: this.requestForm.controls['experience'].value,
      level: this.requestForm.controls['level'].value,
      type: this.requestForm.controls['type'].value,
      project: this.requestForm.controls['projects'].value,
      budget: 0,
      note: this.requestForm.controls['notes'].value,
      comment: this.requestService.selectedRequest.comment,
      status: this.requestService.selectedRequest.statusID,
      parentID: this.requestService.selectedRequest.parentId,
      rank: this.requestService.selectedRequest.rank,
      createBy: 'HUNGNX',
      createDate: '2022-06-23T08:45:38.630Z',
      updateBy: 'HUNGNX',
      updateDate: '2022-06-23T08:45:38.630Z',
      hrInchange: '',
    };
    console.log(request);
    Swal.fire({
      text: 'Are you sure to edit this request?',
      iconHtml:
        ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
      showCancelButton: true,
      confirmButtonColor: '#309EFC',
      cancelButtonColor: '#8B94B2',
      confirmButtonText: 'Confirm',
      width: '380px',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('confirm');
        this.requestService.editRequest(request).subscribe(
          (response: any) => {
            console.log('call api');
            if (response.status == true) {
              this.commonService.popUpSuccess();
              this.location.back();
            } else {
              this.commonService.popUpFailed('Something wrong');
            }
          },
          (err: any) => {
            this.commonService.popUpFailed('Something wrong');
          }
        );
      }
    });
  }
  loadData() {
    this.loadListOfLevel();
    // this.loadListOfPosition();
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
    if (
      this.requestService.selectedRequest.statusID == 1 ||
      this.requestService.selectedRequest.statusID == 3 ||
      this.requestService.selectedRequest.statusID == 5
    ) {
      this.orgPicker.fire();
    }
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
    let newdate;
    return (newdate = dateStr.split('/').reverse().join('-')); //ex out: "18/01/10"
  }
  disableALL() {
    if (
      this.requestService.selectedRequest.statusID == 2 ||
      this.requestService.selectedRequest.statusID == 4
    ) {
      this.requestForm.disable();
      this.requestForm.controls['dep'].setErrors({ incorrect: true });
    }
  }
}
