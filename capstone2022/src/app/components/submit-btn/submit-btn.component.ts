import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-submit-btn',
  templateUrl: './submit-btn.component.html',
  styleUrls: ['./submit-btn.component.scss'],
})
export class SubmitBtnComponent implements OnInit {
  @Input('action') action: any;
  constructor(
    private reqService: RequestService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}
  submit() {
    let check = this.reqService.listSelectedRequest.every((req: any) => {
      return req.statusID == 1;
    });
    if (check) {
      let idList = this.reqService.listSelectedRequest.map(
        (req: any) => req.id
      );
      this.reqService.submitRequest(idList).subscribe(
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
      this.commonService.popUpFailed('Only choose request has draft status');
    }
  }
}
