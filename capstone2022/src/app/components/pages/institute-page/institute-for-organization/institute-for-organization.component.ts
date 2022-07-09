import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CommonService } from 'src/app/services/common.service';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-institute-for-organization',
  templateUrl: './institute-for-organization.component.html',
  styleUrls: ['./institute-for-organization.component.scss']
})
export class InstituteForOrganizationComponent implements OnInit {
  route = { name: 'Create Orgnization', link: 'phanloaitochuc' };

  orgForm!: FormGroup;
  parentId!: number;
  mode!: number;
  nationList!: any;
  provinceList!: any;
  districtList!: any;
  wardList!: any;
  managerId!: 0;
  today: string = new Date().toISOString().slice(0, 10);
  department: any;
  emp: any;

  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    public readonly swalTargets: SwalPortalTargets,
    private orgService: OrganizationService,
    private commonService: CommonService,
    private organizationService: OrganizationService,
    private profileServices: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  innitCode() {
    this.commonService
      .autoGencode3Char('Orgnization', 'ORG')
      .subscribe((res: any) => {
        this.orgForm.controls['orgCode'].setValue(res);
      });
  }
  getOrgParent() {
    this.organizationService
      .getOrgByID(this.parentId)
      .subscribe((res: any) => {
        this.orgForm.controls['parentName'].setValue(res.data.name);
      });
  }

  renderProvince(change: any) {
    this.provinceList = [];
    this.districtList = [];
    this.wardList = [];
    let nationId = this.orgForm.controls['nations'].value
    this.profileServices.getProvinceByNationId(nationId).subscribe(
      (response: any) => {
        this.provinceList = response.data;
      },
      (err) => { }
    );
  }
  renderDistrict(change: any) {
    this.districtList = [];
    this.wardList = [];
    let nationId = this.orgForm.controls['provinces'].value
    this.profileServices.getDistrictByProvinceId(nationId).subscribe(
      (response: any) => {
        this.districtList = response.data;
      },
      (err) => { }
    );
  }

  renderWard(change: any) {
    this.wardList = [];
    let nationId = this.orgForm.controls['districts'].value
    this.profileServices.getWardByDistrictId(nationId).subscribe(
      (response: any) => {
        this.wardList = response.data;
      },
      (err) => { }
    );
  }

  ngOnInit() {
    this.parentId = this.activatedRoute.snapshot.queryParams["orgId"];
    this.orgForm = this.fb.group({
      orgCode: [{ value: '', disabled: true }],
      name: ['', [Validators.required]],
      parentName: [{ value: '', disabled: true }],
      notes: [''],
      fax: [''],
      nations: [''],
      email: [''],
      numberBusiness: [''],
      provinces: [''],
      manager: [{ value: '', disabled: true }],
      phone: [''],
      address: ['', [Validators.required]],
      districts: [''],
      wards: [''],
      effectdate: ['', [Validators.required]],
      dissdate: ['']
    });

    this.extendFromParent();
    this.innitCode();
    this.getOrgParent();

    this.profileServices.getNationList().subscribe((res: any) => {
      this.nationList = res.data;
    });

  }
  onSubmit() {
    let nationId = this.orgForm.controls['nations'].value == '' ? 0 : this.orgForm.controls['nations'].value;
    let provinceId = this.orgForm.controls['provinces'].value == '' ? 0 : this.orgForm.controls['provinces'].value;
    let districtId = this.orgForm.controls['districts'].value == '' ? 0 : this.orgForm.controls['districts'].value;
    let wardId = this.orgForm.controls['wards'].value == '' ? 0 : this.orgForm.controls['wards'].value;
    let disDate = this.orgForm.controls['dissdate'].value == '' ? '1000-01-01T15:37:54.773Z' : this.orgForm.controls['dissdate'].value;
    let mngID = this.managerId == null ? 0 : this.managerId
    let obj = {
      id: 0,
      name: this.orgForm.controls['name'].value,
      code: this.orgForm.controls['orgCode'].value,
      parentID: this.parentId,
      level: 0,
      createDate: Date.now,
      efectDate: this.orgForm.controls['effectdate'].value,
      dissolutionDate: disDate,
      status: -1,
      note: this.orgForm.controls['notes'].value,
      fax: this.orgForm.controls['fax'].value,
      email: this.orgForm.controls['email'].value,
      mobile: this.orgForm.controls['phone'].value,
      numberBussines: this.orgForm.controls['numberBusiness'].value,
      address: this.orgForm.controls['address'].value,
      nationID: nationId,
      provinceID: provinceId,
      districtID: districtId,
      wardID: wardId,
      managerID: mngID
    };
    this.organizationService.insertOrg(obj).subscribe((response: any) => {
      if (response.status == true) {
        this.commonService.popUpSuccess()
      } else {
        this.commonService.popUpFailed('Failed')
      }
    }, (err) => {
      this.commonService.popUpFailed('Failed')
    })
  }
  showPopUp() {
    this.orgPicker.fire();
  }

  getDataFromPopup(department: any) {
    this.department = department;
  }

  getEmp(emp: any) {
    this.emp = emp;
    this.managerId = emp.id;
    this.orgForm.controls['manager'].setValue(emp.fullName);
  }
  resetPositionField() {
    this.orgForm.controls['position']?.reset();
  }
  clearInputField() {
    if (this.requestService.selectedRequest.id != 0) {
    }
  }
  extendFromParent() {
    let parentRequest = this.requestService.selectedRequest;
    if (parentRequest.id != 0) {
      this.orgForm.controls['dep'].setValue(parentRequest.orgnizationID);
    }
  }
}

