import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  constructor(public auth:AuthorizeService, public readonly swalTargets: SwalPortalTargets,) { }

  ngOnInit(): void {
    
    this.auth.getUserInfo().subscribe((res:any)=>{
      console.log(res)
    this.auth.user=res.data
    this.auth.userSubject.next(this.auth.user)
    })
  }
  showPopUp() {
    this.orgPicker.fire();
  }
}
