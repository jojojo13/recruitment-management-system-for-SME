import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
