import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';

@Component({
  selector: 'app-system-categories-page',
  templateUrl: './system-categories-page.component.html',
  styleUrls: ['./system-categories-page.component.scss'],
})
export class SystemCategoriesPageComponent implements OnInit {
  disable = true;
  idSelected: any;
  route = { name: 'System categories', link: 'phanloaitochuc' };
  categoryForm!: FormGroup;
  action = 'Viewing';
  categories: any;
  listItemInCategory: any;
  selectedIndex = 0;
  typeID = 8;
  code = '';
  task: any = {
    name: '',
    completed: false,
    color: 'primary',
    subtasks:[],
  };
  selectedIndexInTable: any;
  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      code: [{ value: '', disabled: true }],
      note: [{ value: '', disabled: true }],
    });

    this.organizationService.getOtherListType(3).subscribe((res: any) => {
      this.categories = res.data;
    });
    this.commonService.getOtherList('RC_PROJECT',0,9999).subscribe((res: any) => {
      this.listItemInCategory = res.data;
      this.task.subtasks=this.listItemInCategory
    });
  }
  addNewCategory() {
    this.enableAllControl();
    this.disable = false;
    this.action = 'Add new';
    this.selectedIndexInTable = null;
    this.innitCode();
  }
  innitCode() {
    this.commonService
      .autoGencode3Char('Other_List', 'OT')
      .subscribe((res: any) => {
        this.categoryForm.controls['code'].setValue(res);
      });
  }
  enableAllControl() {
    this.categoryForm.controls['name'].enable();
    this.categoryForm.controls['note'].enable();
  }

  onSubmit() {
    let obj = {
      id: 0,
      code: this.categoryForm.controls['code'].value,
      name: this.categoryForm.controls['name'].value,
      note: this.categoryForm.controls['note'].value,
      atribute1: 'string',
      atribute2: 'string',
      atribute3: 'string',
      typeID: this.typeID,
    };
    if (this.action == 'Add new') {
      this.commonService.insertOtherList(obj).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loadData(this.code);
            this.resetToDefault();
            this.commonService.popUpSuccess();
          } else {
            this.commonService.popUpFailed();
          }
        },
        (err) => {
          this.commonService.popUpFailed();
        }
      );
    }

    if (this.action == 'Editting') {
      let obj = {
        id: this.idSelected,
        code: this.categoryForm.controls['code'].value,
        name: this.categoryForm.controls['name'].value,
        note: this.categoryForm.controls['note'].value,
        atribute1: 'string',
        atribute2: 'string',
        atribute3: 'string',
        typeID: this.typeID,
      };
      this.commonService.editOtherList(obj).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status == true) {
            this.loadData(this.code);
            this.resetToDefault();
            this.commonService.popUpSuccess();
          } else {
            this.commonService.popUpFailed();
          }
        },
        (err) => {
          this.commonService.popUpFailed();
        }
      );
    }
  }
  renderData(code: string, index: number, categoryID: number) {
    this.resetToDefault();
    this.code = code;
    this.selectedIndex = index;
    this.typeID = categoryID;
    this.selectedIndexInTable = null;
    this.loadData(code);
  }
  loadData(code: string) {
    this.commonService.getOtherList(code,0,9999).subscribe((res: any) => {
      this.listItemInCategory = res.data;
      console.log(this.listItemInCategory);
    });
  }
  chooseItem(item: any, i: number) {
    this.selectedIndexInTable = i;
    this.enableAllControl();
    this.action = 'Editting';
    this.disable = false;
    this.idSelected = item.id;
    this.categoryForm.controls['name'].setValue(item.name);
    this.categoryForm.controls['note'].setValue(item.note);
    this.categoryForm.controls['code'].setValue(item.code);
  }
  resetToDefault() {
    this.categoryForm.controls['name'].setValue('');
    this.categoryForm.controls['note'].setValue('');
    this.innitCode();
  }
  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every((t:any) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter((t:any) => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t:any) => (t.completed = completed));
  }
}
