import { ViewRequestPageComponent } from './components/pages/recruitment-request-page/view-request-page/view-request-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RecruitmentRequestPageComponent } from './components/pages/recruitment-request-page/recruitment-request-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CreateRequestPageComponent } from './components/pages/recruitment-request-page/create-request-page/create-request-page.component';
import { AuthorizeGuard } from './services/guard/authorize.guard';
import { ViewOneRequestPageComponent } from './components/pages/recruitment-request-page/view-one-request-page/view-one-request-page.component';
import { CandidatePageComponent } from './components/pages/candidate-page/candidate-page.component';
import { CreateCandidatePageComponent } from './components/pages/candidate-page/create-candidate-page/create-candidate-page.component';
import { ClassifyPageComponent } from './components/pages/classify-page/classify-page.component';
import { SystemCategoriesPageComponent } from './components/pages/classify-page/system-categories-page/system-categories-page.component';
import { TitleCategoryPageComponent } from './components/pages/classify-page/title-category-page/title-category-page.component';
import { PositionCategoiresPageComponent } from './components/pages/classify-page/position-categoires-page/position-categoires-page.component';
import { InstitutePageComponent } from './components/pages/institute-page/institute-page.component';
import { PositionInOrgComponent } from './components/pages/institute-page/position-in-org/position-in-org.component';
import { ViewOrganizationComponent } from './components/pages/institute-page/view-organization/view-organization.component';
import { InstituteForOrganizationComponent } from './components/pages/institute-page/institute-for-organization/institute-for-organization.component';
import { ProfileCategoryPageComponent } from './components/pages/profile-category-page/profile-category-page.component';
import { ContractCategoryPageComponent } from './components/pages/profile-category-page/contract-category-page/contract-category-page.component';
import { ProfileInstitutePageComponent } from './components/pages/profile-institute-page/profile-institute-page.component';
import { ViewEmployeePagesComponent } from './components/pages/profile-institute-page/view-employee-pages/view-employee-pages.component';
import { EmployeeInformationComponent } from './components/pages/profile-institute-page/employee-information/employee-information.component';

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
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'yeucautuyendung/xemyeucau/:id',
        component: ViewOneRequestPageComponent,
      },
      { path: 'ungvien', component: CandidatePageComponent },
      {
        path: 'ungvien/taoungvien',
        component: CreateCandidatePageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'phanloaitochuc',
        component: ClassifyPageComponent,
       
      },
      {
        path: 'thietlaptochuc',
        component: InstitutePageComponent,
      },
      {
        path: 'phanloaitochuc/thamsohethong',
        component: SystemCategoriesPageComponent,
      },
      {
        path: 'phanloaitochuc/danhmuchucdanh',
        component: TitleCategoryPageComponent,
      },
      {
        path: 'phanloaitochuc/danhmucvitricongviec',
        component: PositionCategoiresPageComponent,
      },
      {
        path: 'thietlaptochuc/vitricongviec',
        component: PositionInOrgComponent,
      },
      {
        path: 'thietlaptochuc/xemtochuc',
        component: ViewOrganizationComponent,
      },
      {
        path: 'thietlaptochuc/tochuc',
        component: InstituteForOrganizationComponent,
      },
      {
        path: 'danhmuchoso',
        component: ProfileCategoryPageComponent,
      },
      {
        path: 'danhmuchoso/hopdong',
        component: ContractCategoryPageComponent,
      },
      {
        path: 'danhmuchoso/',
        component: ContractCategoryPageComponent,
      },
      {
        path: 'thietlaphoso',
        component: ProfileInstitutePageComponent,
      },
      {
        path: 'thietlaphoso/nhanvien',
        component: ViewEmployeePagesComponent,
      },
      {
        path: 'thietlaphoso/thongtinnhanvien',
        component: EmployeeInformationComponent,
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
