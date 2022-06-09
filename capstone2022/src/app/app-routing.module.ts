import { ViewRequestPageComponent } from './components/pages/recruitment-request-page/view-request-page/view-request-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RecruitmentRequestPageComponent } from './components/pages/recruitment-request-page/recruitment-request-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CreateRequestPageComponent } from './components/pages/recruitment-request-page/create-request-page/create-request-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: 'yeucautuyendung', component: RecruitmentRequestPageComponent },
      {
        path: 'yeucautuyendung/xemyeucau',
        component: ViewRequestPageComponent,
      },
      {
        path: 'yeucautuyendung/taoyeucau',
        component: CreateRequestPageComponent,
      },
    ],
  },

  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
