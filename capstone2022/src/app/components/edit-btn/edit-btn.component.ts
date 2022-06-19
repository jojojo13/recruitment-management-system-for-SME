import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss'],
})
export class EditBtnComponent implements OnInit {
  @Input('action') action: any;
  constructor(
    private reqService: RequestService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}

  editStatus() {
    this.reqService
      .approveRequest(this.reqService.listSelectedRequest)
      .subscribe(
        (response: any) => {
          if (response.status == true) {
            this.commonService.popUpSuccess();
          } else {
            this.commonService.popUpFailed('Something wrong');
          }
        },
        (err) => {
          this.commonService.popUpFailed('Something wrong');
        }
      );
  }
}
