import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  listPosition: any;
  requestForm!: FormGroup;
  today: string = new Date().toISOString().slice(0, 10);
  type = ['Department', 'Project'];
  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    public readonly swalTargets: SwalPortalTargets,
    private orgService: OrganizationService
  ) {}

  async ngOnInit() {
    this.requestForm = this.fb.group({
      requestCode: [{value:'RC006',disabled:true}],
      name: ['', [Validators.required]],
      type: [this.type[0]],
      dep: ['', [Validators.required]],
      position: ['', [Validators.required]],
      quantity: [
        '',
        [Validators.pattern('^[1-9][0-9]*$'), Validators.required],
      ],
      office: [''],
      deadline: [''],
      experience: [''],
      level: [''],
      budget: ['', [Validators.pattern('^[1-9][0-9]*$'), Validators.required]],
      notes: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log(this.requestForm.value);
  }
  showPopUp() {
    this.orgPicker.fire();
  }
  getDataFromPopup(department: any) {
    this.requestForm.controls['dep']?.setValue(department.name);
    this.orgPicker.close();
    this.renderPosition(department.id);
    this.resetPositionField();
  }
  renderPosition(id: number) {
    this.orgService.getPositionByOrgID(id).subscribe((response: any) => {
      this.listPosition = response.data;
    });
  }
  resetPositionField() {
    this.requestForm.controls['position']?.reset();
  }
}
