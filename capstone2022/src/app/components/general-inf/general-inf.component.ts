import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-general-inf',
  templateUrl: './general-inf.component.html',
  styleUrls: ['./general-inf.component.scss']
})
export class GeneralInfComponent implements OnInit {
  @Output('candidateName') candidateName=new EventEmitter<string>()
  name=''
  contactForm!:FormGroup
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.contactForm=this.fb.group({
      phone:['',[Validators.required]],
      email:['',[Validators.required]],
      linkedIn:[''],
      facebook:[''],
      twitter:['']
    })
  }
  onChange(){
    this.candidateName.emit(this.name)
  }
}
