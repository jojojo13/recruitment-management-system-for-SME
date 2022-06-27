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
  request: any;
  isLoaded = true;
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
    this.isLoaded = false;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
      'block';
    let obj = {
      id: this.request.id,
      comment: this.commentString,
    };

    this.requestService.sendComment(obj).subscribe(
      (response: any) => {
        if ((response.status = true)) {
          this.isLoaded = true;
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
          this.commonService.popUpSuccess();
          this.commonService.reloadCurrentRoute();
        } else {
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
          this.isLoaded = true;
          this.commonService.popUpFailed('Failed');
        }
      },
      (err) => {
        this.isLoaded = true;
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
        this.commonService.popUpFailed('Failed');
      }
    );
  }
  getReq(req: any) {
    this.request = req;
  }
}
