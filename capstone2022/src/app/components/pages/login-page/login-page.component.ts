import { Account } from '../../../models/Account';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: UntypedFormGroup;
  account: Account;
  msg = '';
  redirectURL = '/';
  isLoaded = true;
  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthorizeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.account = new Account();
  }

  ngOnInit(): void {}
  signIn() {
    this.isLoaded = false;
    this.account = this.loginForm.value;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
      'block';
    this.auth.signIn(this.account).subscribe(
<<<<<<< HEAD
      (data: any) => {
        if(data.status==true){
          localStorage.setItem('token', data.data);
=======
      (obj: any) => {
        let mess = obj.mess;

        if (obj.status == true) {
          localStorage.setItem('token', obj.data);
>>>>>>> refs/remotes/origin/main
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
          this.isLoaded = true;
          let params = this.route.snapshot.queryParams;
          if (params['redirectURL']) {
            this.redirectURL = params['redirectURL'];
          }
<<<<<<< HEAD
  
=======

>>>>>>> refs/remotes/origin/main
          if (this.redirectURL) {
            this.router
              .navigateByUrl(this.redirectURL)
              .catch(() => this.router.navigate(['/']));
          } else {
            this.router.navigate(['/']);
          }
<<<<<<< HEAD
        }else{
          (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
        this.isLoaded = true; 
          this.msg = data.mess;
=======
        }
        else {
          (err: any) => {
            this.isLoaded = true;
            this.msg = mess;
            (document?.querySelector('.overlay') as HTMLElement).style.display =
              'none';
          }

>>>>>>> refs/remotes/origin/main
        }
        
      },
<<<<<<< HEAD
      (err: any) => {
        this.isLoaded = true;
    
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'block';
      }
=======

>>>>>>> refs/remotes/origin/main
    );
  }
}
