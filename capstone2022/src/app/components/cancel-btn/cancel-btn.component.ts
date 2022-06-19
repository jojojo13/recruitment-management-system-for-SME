import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-cancel-btn',
  templateUrl: './cancel-btn.component.html',
  styleUrls: ['./cancel-btn.component.scss'],
})
export class CancelBtnComponent implements OnInit {
  @Input('action') action: any;
  constructor(
    private reqService: RequestService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}
  editStatus() {
    this.reqService
      .cancelRequest(this.reqService.listSelectedRequest)
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
