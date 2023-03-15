import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainSidebarComponent } from './components/main-sidebar/main-sidebar.component';
import { ContentWrapperComponent } from './components/content-wrapper/content-wrapper.component';
import { ControlSidebarComponent } from './components/control-sidebar/control-sidebar.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { CreateRegistrationComponent } from './components/create-registration/create-registration.component';
import { RegistrationDetailsComponent } from './components/registration-details/registration-details.component';
import { RegistrationsListComponent } from './components/registrations-list/registrations-list.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { RequestDetailsComponent } from './components/request-details/request-details.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { RegistrationProfileComponent } from './components/registration-profile/registration-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    ContentWrapperComponent,
    ControlSidebarComponent,
    MainFooterComponent,
    CreateRegistrationComponent,
    RegistrationDetailsComponent,
    RegistrationsListComponent,
    CreateRequestComponent,
    RequestDetailsComponent,
    RequestsListComponent,
    RegistrationProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
