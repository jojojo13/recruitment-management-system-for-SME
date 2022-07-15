import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('user') user:any
  constructor(private router:Router,private auth:AuthorizeService) { }

  ngOnInit(): void {
    this.auth.getUserInfo().subscribe((res:any)=>{
      console.log(res)
    this.auth.user=res.data
    this.auth.userSubject.next(this.auth.user)
    })
  }
  logOut(){
    localStorage.removeItem('token')
    this.router.navigateByUrl('login')
  }
}
