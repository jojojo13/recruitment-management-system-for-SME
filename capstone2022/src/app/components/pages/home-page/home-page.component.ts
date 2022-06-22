import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public auth:AuthorizeService) { }

  ngOnInit(): void {
    this.auth.getUserInfo().subscribe((res:any)=>{
    this.auth.user=res.data
    this.auth.userSubject.next(this.auth.user)
    })
  }

}
