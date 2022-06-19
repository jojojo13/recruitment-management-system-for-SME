import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-reject-btn',
  templateUrl: './reject-btn.component.html',
  styleUrls: ['./reject-btn.component.scss'],
})
export class RejectBtnComponent implements OnInit {
  @Input('action') action: any;
  constructor(
    private reqService: RequestService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}
  reject() {
    let check = this.reqService.listSelectedRequest.every((req: any) => {
      return req.statusID == 2;
    });
    if (check) {
      let idList = this.reqService.listSelectedRequest.map(
        (req: any) => req.id
      );
      this.reqService.rejectRequest(idList).subscribe(
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
    } else {
      this.commonService.popUpFailed(
        'Only choose request has submitted status'
      );
    }
  }
}
