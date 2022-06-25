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
      comment: this.commentString,
    };

    console.log(obj);
    this.requestService.sendComment(obj).subscribe(
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
