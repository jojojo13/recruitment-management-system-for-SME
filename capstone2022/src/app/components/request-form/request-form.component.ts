import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  requestForm!: FormGroup;
  today:string=new Date().toISOString().slice(0, 10);
  dep=['Department','Project']
  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  constructor(private fb: FormBuilder, public readonly swalTargets: SwalPortalTargets) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      requestID: [''],
      name: ['', [Validators.required]],
      requestLevel: [this.dep[0]],
      dep: ['',[Validators.required]],
      position: [''],
      quantity: ['', [Validators.pattern('^[1-9][0-9]*$'),Validators.required]],
      office: [''],
      deadline: [''],
      experience: [''],
      level: [''],
      budget: ['', [Validators.pattern('^[1-9][0-9]*$'),Validators.required]],
      notes: ['', Validators.required],
    });
  }
  onSubmit(){
    console.log(this.requestForm.value)
  }
  showPopUp(){
    this.orgPicker.fire();
  }
  getDataFromPopup(department:any){
  
    this.requestForm.controls['dep']?.setValue(department.name)
  }
}
