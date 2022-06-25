import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-view-one-request-page',
  templateUrl: './view-one-request-page.component.html',
  styleUrls: ['./view-one-request-page.component.scss'],
})
export class ViewOneRequestPageComponent implements OnInit {
  route: any = { name: 'View any request', link: 'yeucautuyendung' };
  user: any;
  commentString: any;

  constructor(
    private location: Location,
    public requestService: RequestService,
    private auth: AuthorizeService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.auth.userSubject.subscribe((user) => {
      this.user = user;
    });
  }
  uploadComment() {
  
   
    let obj = {
      id: this.requestService.selectedRequest.id,
      name: this.requestService.selectedRequest.name,
      code: this.requestService.selectedRequest.code,
      requestLevel: this.requestService.selectedRequest.typeID,
      orgnizationId: this.requestService.selectedRequest.orgnizationID,
      positionID: this.requestService.selectedRequest.positionID,
      number: this.requestService.selectedRequest.quantity,
      signId: this.requestService.selectedRequest.signID,
      effectDate:'2022-06-23T08:45:38.630Z',
      expireDate:this.commonService.formatDate(this.requestService.selectedRequest.deadline),
      yearExperience: this.requestService.selectedRequest.experience,
      level: this.requestService.selectedRequest.level,
      type: this.requestService.selectedRequest.typeID,
      project: this.requestService.selectedRequest.projectID,
      budget: 0,
      note: this.requestService.selectedRequest.note,
      comment: this.commentString,
      status: this.requestService.selectedRequest.statusID,
      parentID: this.requestService.selectedRequest.parentId,
      rank: this.requestService.selectedRequest.rank,
      createBy: '',
      createDate: '2022-07-17',
      updateBy: 'string',
      updateDate: '2022-06-25T15:24:09.888',
      hrInchange: 0,
    };

    console.log(obj);
    this.requestService.editRequest(obj).subscribe(
      (response: any) => {
        if ((response.status = true)) {
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
