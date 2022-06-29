import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/Country';

@Component({
  selector: 'app-general-inf',
  templateUrl: './general-inf.component.html',
  styleUrls: ['./general-inf.component.scss'],
})
export class GeneralInfComponent implements OnInit, OnChanges {
  @Output('candidateName') candidateName = new EventEmitter<string>();
  @Input('step') step = 3;
  name = '';
  contactForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.step);
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      linkedIn: [''],
      facebook: [''],
      twitter: [''],
      skype: [''],
      website: [''],
      name: ['',Validators.required],
      dob: [''],
      gender: [''],
      major: [''],
      university: [''],
      graduate: [''],
      gpa: [''],
      country: [''],
      awards: [''],
    });
  }
  onChange() {
    this.candidateName.emit(this.name);
  }
  onCountrySelected($event: Country) {}
}
