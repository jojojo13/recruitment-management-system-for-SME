import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss'],
})
export class EditBtnComponent implements OnInit {
  @Input('action') action: any;
  @Input('request') request: any;
  constructor(
    private reqService: RequestService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}

  editStatus() {
    console.log(this.request.statusID);
  let list:Array<number>=[]
   list.push(this.request.id)
    if (this.request.statusID == 2) {
      Swal.fire({
        text: 'Are you sure to approve?',
        iconHtml:
          ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
        showCancelButton: true,
        confirmButtonColor: '#309EFC',
        cancelButtonColor: '#8B94B2',
        confirmButtonText: 'Confirm',
        width: '380px',
      }).then((result) => {
        if (result.isConfirmed) {
          this.reqService.approveRequest(list).subscribe(
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
        'Only choose request has submitted status'
      );
    }
  }
}
