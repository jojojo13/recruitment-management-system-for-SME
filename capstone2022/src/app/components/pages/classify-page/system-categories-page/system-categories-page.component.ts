import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
  categoryForm!: UntypedFormGroup;
  action = 'Viewing';
  categories: any;
  listItemInCategory: any;
  listSelected!: Array<number>;
  selectedIndex = 0;
  typeID = 8;
  code = 'RC_PROJECT';
  itemsPerPage = 4;
  totalItems!: number;
  page: number = 1;
  selectedIndexInTable: any;
  constructor(
    private fb: UntypedFormBuilder,
    private organizationService: OrganizationService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.listSelected = [];
    this.categoryForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      code: [{ value: '', disabled: true }],
      note: [{ value: '', disabled: true }],
    });

    this.organizationService.getOtherListType(3).subscribe((res: any) => {
      this.categories = res.data;
    });
    this.commonService
      .getOtherList('RC_PROJECT', 0, 9999)
      .subscribe((res: any) => {
        this.listItemInCategory = res.data;
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

  disableControl() {
    this.categoryForm.controls['name'].disable();
    this.categoryForm.controls['note'].disable();
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
            this.loadData(this.code, this.page - 1);
            this.resetValue();
            this.innitCode();
            this.commonService.popUpSuccess();
          } else {
            this.commonService.popUpFailed('Failed');
          }
        },
        (err) => {
          this.commonService.popUpFailed('Failed');
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
            this.loadData(this.code, this.page - 1);
            this.resetValue();
            this.commonService.popUpSuccess();
          } else {
            this.commonService.popUpFailed('Failed');
          }
        },
        (err) => {
          this.commonService.popUpFailed('Failed');
        }
      );
    }
  }
  renderData(code: string, index: number, categoryID: number) {
    this.page = 1;
    this.resetValue();
    this.resetSelectedList();
    this.code = code;
    this.selectedIndex = index;
    this.typeID = categoryID;
    this.selectedIndexInTable = null;
    this.loadData(code, this.page - 1);
    this.disableControl();
  }
  loadData(code: string, pageIndex: number) {
    this.commonService
      .getOtherList(code, pageIndex, this.itemsPerPage)
      .subscribe((res: any) => {
        this.listItemInCategory = res.data;
        this.totalItems = res.totalItem;
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

  resetValue() {
    this.categoryForm.controls['name'].setValue('');
    this.categoryForm.controls['note'].setValue('');
    this.categoryForm.controls['code'].setValue('');
  }
  resetSelectedList() {
    this.listSelected = [];
  }

  updateAllComplete($event: any, id: number) {
    if ((event?.target as any).checked) {
      this.listSelected.push(id);
    } else {
      let index = this.listSelected.findIndex((idObject) => idObject == id);
      this.listSelected.splice(index, 1);
    }
    console.log(this.listSelected);
  }
  gty(page: number) {
    this.selectedIndexInTable = null;
    this.loadData(this.code, page - 1);
  }
  deleteCategory() {
    if (this.listSelected.length <= 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    } else {
      this.commonService.deleteOtherList(this.listSelected).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loadData(this.code, this.page - 1);

            this.commonService.popUpSuccess();
          } else {
            this.commonService.popUpFailed('Some records have been appplied');
          }
        },
        (err) => {
          this.commonService.popUpFailed('Some records have been appplied');
        }
      );
    }
  }
}
