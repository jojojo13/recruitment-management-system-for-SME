import { Account } from '../../../models/Account';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
    this.account = this.loginForm.value;
    console.log(this.account);
    this.auth.signIn(this.account).subscribe(
      (data: any) => {
        console.log(data)
        localStorage.setItem('token', data.data);
        let params = this.route.snapshot.queryParams;
        if (params['redirectURL']) {
          this.redirectURL = params['redirectURL'];
        }

        if (this.redirectURL) {
          this.router
            .navigateByUrl(this.redirectURL)
            .catch(() => this.router.navigate(['/']));
        } else {
          this.router.navigate(['/']);
        }
      },
      (err: any) => {
        this.msg = 'Wrong account or password';
        console.log(err);
      }
    );
  }
}
