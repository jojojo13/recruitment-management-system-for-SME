import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { ActionListComponent } from './components/action-list/action-list.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { RecruitmentRequestPageComponent } from './components/pages/recruitment-request-page/recruitment-request-page.component';
import { ViewRequestPageComponent } from './components/pages/recruitment-request-page/view-request-page/view-request-page.component';
import { NavigateBarComponent } from './components/navigate-bar/navigate-bar.component';
import { BackBtnComponent } from './components/back-btn/back-btn.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { CreateRequestPageComponent } from './components/pages/recruitment-request-page/create-request-page/create-request-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GridComponent } from './components/grid/grid.component';
import { LoaderComponent } from './components/loader/loader.component';
import { OrganizationPoppupComponent } from './components/organization-poppup/organization-poppup.component';
import { ToStringPipe } from './components/pipes/to-string.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PopUpOrganizationsComponent } from './components/pop-up-organizations/pop-up-organizations.component';
import { AddBtnComponent } from './components/add-btn/add-btn.component';
import { ViewOneRequestPageComponent } from './components/pages/recruitment-request-page/view-one-request-page/view-one-request-page.component';
import { FormRequestComponent } from './components/form-request/form-request.component';
import { CustomizeButtonComponent } from './components/customize-button/customize-button.component';
import { CandidatePageComponent } from './components/pages/candidate-page/candidate-page.component';
import { CreateCandidatePageComponent } from './components/pages/candidate-page/create-candidate-page/create-candidate-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AttachFileComponent } from './components/attach-file/attach-file.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ClassifyPageComponent } from './components/pages/classify-page/classify-page.component';
import { SystemCategoriesPageComponent } from './components/pages/classify-page/system-categories-page/system-categories-page.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditBtnComponent } from './components/edit-btn/edit-btn.component';
import { CancelBtnComponent } from './components/cancel-btn/cancel-btn.component';
import { SubmitBtnComponent } from './components/submit-btn/submit-btn.component';
import { RejectBtnComponent } from './components/reject-btn/reject-btn.component';

import { JwtInterceptor } from './helpers/tokenExpired.intercepter';
import { TitleCategoryPageComponent } from './components/pages/classify-page/title-category-page/title-category-page.component';
import { PositionCategoiresPageComponent } from './components/pages/classify-page/position-categoires-page/position-categoires-page.component';
import { HistoryComponent } from './components/history/history.component';
import { StepComponent } from './components/step/step.component';
import { ShowPdfFileComponent } from './components/show-pdf-file/show-pdf-file.component';
import { InstitutePageComponent } from './components/pages/institute-page/institute-page.component';
import { PositionInOrgComponent } from './components/pages/institute-page/position-in-org/position-in-org.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewOrganizationComponent } from './components/pages/institute-page/view-organization/view-organization.component';
import { InstituteForOrganizationComponent } from './components/pages/institute-page/institute-for-organization/institute-for-organization.component';
import { PopupEmployeeComponent } from './components/popup-employee/popup-employee.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HeaderComponent,
    MenuComponent,
    ActionListComponent,
    HomePageComponent,
    RecruitmentRequestPageComponent,
    ViewRequestPageComponent,
    NavigateBarComponent,
    BackBtnComponent,
    RequestFormComponent,
    CreateRequestPageComponent,
    GridComponent,
    LoaderComponent,
    OrganizationPoppupComponent,
    ToStringPipe,
    PopUpOrganizationsComponent,
    AddBtnComponent,
    ViewOneRequestPageComponent,
    FormRequestComponent,
    CustomizeButtonComponent,
    CandidatePageComponent,
    CreateCandidatePageComponent,
    ProfileComponent,
    AttachFileComponent,
    ContactFormComponent,
    ClassifyPageComponent,
    SystemCategoriesPageComponent,
    EditBtnComponent,
    CancelBtnComponent,
    SubmitBtnComponent,
    RejectBtnComponent,
    TitleCategoryPageComponent,
    PositionCategoiresPageComponent,
    HistoryComponent,
    StepComponent,
    ShowPdfFileComponent,
    InstitutePageComponent,
    PositionInOrgComponent,
    ViewOrganizationComponent,
    InstituteForOrganizationComponent,
    PopupEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatCheckboxModule,
    SweetAlert2Module.forRoot(),
    PdfViewerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
}
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
