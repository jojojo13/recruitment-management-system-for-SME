import { Account } from '../../../models/Account';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm:FormGroup
  account:Account
  msg=''
  constructor(private fb:FormBuilder,private auth:AuthorizeService) { 
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
    
    this.account=new Account();
  }

  ngOnInit(): void {
    
  }
  signIn(){
    this.account=this.loginForm.value
    console.log(this.account)
    this.auth.signIn(this.account).subscribe((data:any)=>{
     console.log('dang call data')
alert('da dang nhap duoc rui')
      console.log(data)
    },(err:any)=>{
      console.log(err)
      
    })
  }

}
