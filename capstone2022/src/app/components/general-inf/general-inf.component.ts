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
import { CommonService } from 'src/app/services/common.service';
import { ProfileService } from 'src/app/services/profile-service/profile.service';

@Component({
  selector: 'app-general-inf',
  templateUrl: './general-inf.component.html',
  styleUrls: ['./general-inf.component.scss'],
})
export class GeneralInfComponent implements OnInit, OnChanges {
  @Output('candidateName') candidateName = new EventEmitter<string>();
  @Input('step') step = 4;
  @Output('candidate') candidate = new EventEmitter<any>();
  name = '';
  contactForm!: FormGroup;
  countries: any;
  selectedCountry: number = 0;
  provinces: any;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private profileService: ProfileService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      phone: [''],
      email: [''],
      linkedIn: [''],
      facebook: [''],
      twitter: [''],
      skype: [''],
      website: [''],
      name: ['', Validators.required],
      dob: [],
      gender: [0],
      major: [''],
      university: [''],
      graduate: [''],
      gpa: [''],
      country: [''],
      awards: [''],
    });
    this.commonService.emitBahavior.subscribe((change) => {
      this.candidate.emit(this.contactForm.value);
    });
    this.contactForm.valueChanges.subscribe((value) => {
      this.candidate.emit(this.contactForm.value);
    });
    this.loadCountry();
  }
  onChange() {
    console.log(this.contactForm.value);
    this.candidateName.emit(this.name)
  }
  onCountrySelected($event: Country) {}

  loadCountry() {
    this.profileService.getNationList().subscribe((response: any) => {
      this.countries = response.data;
    });
  }
  onSelectedCountry() {
    this.profileService
      .getProvinceByNationId(this.contactForm.controls['country'].value)
      .subscribe((data: any) => {
        this.provinces = data.data;
      });
  }
}
