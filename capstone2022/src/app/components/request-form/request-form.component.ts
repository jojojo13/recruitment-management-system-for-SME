import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  requestForm!: FormGroup;
  today:string=new Date().toISOString().slice(0, 10);
  dep=['Department','Project']
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      requestID: [''],
      name: ['', [Validators.required]],
      requestLevel: [this.dep[0]],
      dep: [],
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
}
