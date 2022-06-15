import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-form-request',
  templateUrl: './form-request.component.html',
  styleUrls: ['./form-request.component.scss']
})
export class FormRequestComponent implements OnInit {
  requestForm!:FormGroup
  types:any
  projects:any
  positions:any
  levels:any
  today: string = new Date().toISOString().slice(0, 10);
  constructor(private fb:FormBuilder,private requestService: RequestService,
    public readonly swalTargets: SwalPortalTargets,
    private orgService: OrganizationService,
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit(): void {
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
  }
  onSubmit(){

  }
  loadListOfType(){
    this.commonService.getOtherList('RC_TYPE').subscribe((response: any) => {
      this.types = response.data;
    });
  }
  loadListOfProject(){
    this.commonService.getOtherList('RC_PROJECT').subscribe((response: any) => {
      this.projects = response.data;
    });
  }
  loadListOfPosition(){
    this.orgService.getPositionByOrgID(2).subscribe(
      (response: any) => {
        this.positions = response.data;
      },
      (err) => {}
    );
  }
  loadListOfLevel(){
    this.commonService.getOtherList('RC_LEVEL').subscribe((response: any) => {
      this.levels = response.data;
    });
  }
  showPopUp(){

  }
}
