import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TitleService } from 'src/app/services/title-service/title.service';

@Component({
  selector: 'app-title-category-page',
  templateUrl: './title-category-page.component.html',
  styleUrls: ['./title-category-page.component.scss'],
})
export class TitleCategoryPageComponent implements OnInit {
  route = { name: 'Title categories', link: 'phanloaitochuc' };
  constructor(private fb: FormBuilder,private titleservice:TitleService) {}
  titleForm!: FormGroup;
  titleList:any
  ngOnInit(): void {
    this.titleForm = this.fb.group({
      name: [{ value: '', disabled: false }],
      code: [{ value: '', disabled: false }],
      note: [{ value: '', disabled: false }],
    });
    this.titleservice.getAll(0,3).subscribe((response:any)=>{
      this.titleList=response.data
    })
  }
  onSubmit(){

  }
}
