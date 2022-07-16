import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  today: string = new Date().toISOString().slice(0, 10);
  genderObject = { name: 'Male', value: 1 };
  contactForm!: FormGroup;
  countries: any;
  selectedCountry: number = 0;
  provinces: any;
  emailPattern = '([a-z]{1,10}\\.)?([a-z]){2,10}\\@(gmail.com)';
  phonePattern = new RegExp('(84|0[3|5|7|8|9])+([0-9]{8})\\b');
  zaloPattern =  new RegExp('(84|0[3|5|7|8|9])+([0-9]{8})\\b');
  namePattern = '\\w+([[:space:]])\\w+([[:space:]])\\w+$';
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private profileService: ProfileService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      zalo: ['', [Validators.pattern(this.zaloPattern)]],
      linkedIn: [''],
      facebook: [''],
      twitter: [''],
      skype: [''],
      website: [''],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      dob: [''],
      gender: ['', [Validators.required]],
      major: [''],
      university: [''],
      graduate: [''],
      gpa: [0,[Validators.min(0),Validators.max(10)]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      awards: [''],
    });
    this.commonService.emitBahavior.subscribe((change) => {
      this.candidate.emit(this.contactForm);
    });
    this.contactForm.valueChanges.subscribe((value) => {
      this.candidate.emit(this.contactForm);
    });
    this.loadCountry();
  }
  onChange() {
    this.candidateName.emit(this.name);
  }
  onCountrySelected($event: Country) {}

  loadCountry() {
    this.profileService.getNationList().subscribe((response: any) => {
      this.countries = response.data;
    });
  }
  onSelectedCountry() {
    this.profileService
      .getProvinceByNationId(this.contactForm.controls['country'].value.id)
      .subscribe((data: any) => {
        this.provinces = data.data;
      });
  }
}
