import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  route = { name: 'Create request', link: 'yeucautuyendung' };
  listPosition: any;
  requestForm!: FormGroup;
  today: string = new Date().toISOString().slice(0, 10);
  types: any;
  levels: any;
  projects: any;
  officeID!: number;
  departmentID!: number;
  managerID!: number;
  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    public readonly swalTargets: SwalPortalTargets,
    private orgService: OrganizationService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.requestForm = this.fb.group({
      requestCode: [{ value: '', disabled: true }],
      name: ['', [Validators.required]],
      type: [],
      dep: ['', [Validators.required]],
      projects: ['', [Validators.required]],
      position: ['', [Validators.required]],
      quantity: [
        '',
        [Validators.pattern('^[1-9][0-9]*$'), Validators.required],
      ],
      office: [{ value: '', disabled: true }],
      deadline: [''],
      experience: [''],
      level: [''],
      notes: ['', Validators.required],
    });
    this.commonService.getOtherList('RC_TYPE',0,9999).subscribe((response: any) => {
      this.types = response.data;
    });
    this.commonService.getOtherList('RC_LEVEL',0,9999).subscribe((response: any) => {
      this.levels = response.data;
    });
    this.requestService
      .getAutoGenerateCODE(
        'Rc_Request',
        this.requestService.selectedRequest.rank + 1,
        'Rank',
        this.requestService.selectedRequest.id
      )
      .subscribe((code) => {
        this.requestForm.controls['requestCode'].setValue(code);
      });
    this.commonService.getOtherList('RC_PROJECT',0,9999).subscribe((response: any) => {
      this.projects = response.data;
    });
    this.extendFromParent();
  }
  onSubmit(status:number) {
    let request = {
      id: 0,
      name: this.requestForm.controls['name'].value,
      code: this.requestForm.controls['requestCode'].value,
      requestLevel: this.requestForm.controls['type'].value,
      orgnizationId: this.departmentID,
      positionID: this.requestForm.controls['position'].value,
      number: this.requestForm.controls['quantity'].value,
      signId: this.managerID,
      effectDate: this.today,
      expireDate: this.requestForm.controls['deadline'].value,
      yearExperience: this.requestForm.controls['experience'].value,
      level: this.requestForm.controls['level'].value,
      type: this.requestForm.controls['type'].value,
      project: this.requestForm.controls['projects'].value,
      budget: 0,
      note: this.requestForm.controls['notes'].value,
      comment: 'string',
      status: status,
      parentID: this.requestService.selectedRequest.id,
      rank: 0,
      createBy: 'HUNGNX',
      createDate: this.today,
      updateBy: 'HUNGNX',
      updateDate: this.today,
    };
 

    Swal.fire({
      text: 'Are you sure you want to send this request?',
      iconHtml:
        ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
      showCancelButton: true,
      confirmButtonColor: '#309EFC',
      cancelButtonColor: '#8B94B2',
      confirmButtonText: 'Confirm',
      width: '380px',
    }).then((result) => {
      if (result.isConfirmed) {
        this.requestService.insertRequest(request).subscribe(
          (response: any) => {
            if (response.status == true) {
              this.commonService.popUpSuccess()
             
            }
          },
          (err) => {
            this.commonService.popUpFailed()
          }
        );
      }
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
        this.listPosition = response.data;
      },
      (err) => {
        Swal.fire('Position for this department is not available ')
        this.requestForm.controls['dep']?.reset()
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
  extendFromParent() {
    let parentRequest = this.requestService.selectedRequest;
    if (parentRequest.id != 0) {
      this.requestForm.controls['dep'].setValue(parentRequest.orgnizationId);
    }
  }
}
