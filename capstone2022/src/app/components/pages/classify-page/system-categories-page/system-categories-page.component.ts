import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';

@Component({
  selector: 'app-system-categories-page',
  templateUrl: './system-categories-page.component.html',
  styleUrls: ['./system-categories-page.component.scss'],
})
export class SystemCategoriesPageComponent implements OnInit {
  route = { name: 'System categories', link: 'phanloaitochuc' };
  categoryForm!: FormGroup;
  action=''
  categories:any
  constructor(private fb: FormBuilder,private organizationService:OrganizationService) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      code: [{ value: '', disabled: true }],
      note: [{ value: '', disabled: true }],
    });
    this.organizationService.getOtherListType(3).subscribe((res:any)=>{
      this.categories=res.data
    })
  }
  addNewCategory() {
    this.enableAllControl();
    this.action='add'
  }
  enableAllControl() {
    this.categoryForm.controls['name'].enable();
    this.categoryForm.controls['code'].enable();
    this.categoryForm.controls['note'].enable();
  }
  editCategory(){
    this.action='edit'
  }
  onSubmit(){

  }
}
