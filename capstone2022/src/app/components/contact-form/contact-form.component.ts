import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
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

}
