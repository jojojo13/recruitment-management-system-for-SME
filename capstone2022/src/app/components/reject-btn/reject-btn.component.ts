import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import Swal from 'sweetalert2';

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
    if (this.reqService.listSelectedRequest.length > 0) {
      let check = this.reqService.listSelectedRequest.every((req: any) => {
        return req.statusID == 2;
      });
      if (check) {
        let idList = this.reqService.listSelectedRequest.map(
          (req: any) => req.id
        );
        Swal.fire({
          text: 'Are you sure to reject?',
          iconHtml:
            ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
          showCancelButton: true,
          confirmButtonColor: '#309EFC',
          cancelButtonColor: '#8B94B2',
          confirmButtonText: 'Confirm',
          width: '380px',
        }).then((result) => {
          if (result.isConfirmed) {
            this.reqService.rejectRequest(idList).subscribe(
              (response: any) => {
                if (response.status == true) {
                  this.commonService.dataChange.next(true)
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
        });
      
      } else {
        this.commonService.popUpFailed(
          'Only choose request has submitted status'
        );
      }
    } else {
      this.commonService.popUpFailed('Please choose request ');
    }
  }
}
