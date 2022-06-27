import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submit-btn',
  templateUrl: './submit-btn.component.html',
  styleUrls: ['./submit-btn.component.scss'],
})
export class SubmitBtnComponent implements OnInit {
  @Input('action') action: any;
  @Input('request') request: any;
  constructor(
    private reqService: RequestService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}
  submit() {
    if (
      this.request.statusID == 1 ||
      this.request.statusID == 3 ||
      this.request.statusID == 5
    ) {
      Swal.fire({
        text: 'Are you sure to submit?',
        iconHtml:
          ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
        showCancelButton: true,
        confirmButtonColor: '#309EFC',
        cancelButtonColor: '#8B94B2',
        confirmButtonText: 'Confirm',
        width: '380px',
      }).then((result) => {
        if (result.isConfirmed) {
          this.reqService.submitRequest([this.request.statusID]).subscribe(
            (response: any) => {
              if (response.status == true) {
                this.commonService.dataChange.next(true);
                this.commonService.popUpSuccess();
                this.commonService.reloadCurrentRoute()
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
        'Only choose request has draft, cancel, reject status'
      );
    }
  }
}
