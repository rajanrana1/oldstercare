import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './components/create-registration/create-registration.component';
import { RegistrationDetailsComponent } from './components/registration-details/registration-details.component';
import { RegistrationsListComponent } from './components/registrations-list/registrations-list.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { RequestDetailsComponent } from './components/request-details/request-details.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { RegistrationProfileComponent } from './components/registration-profile/registration-profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'requests/l/-1', pathMatch: 'full' },
  { path: 'registrations', component: RegistrationsListComponent },
  { path: 'registration/:id', component: RegistrationProfileComponent },
  { path: 'registrations/:id', component: RegistrationDetailsComponent },
  { path: 'createRegistration', component: CreateRegistrationComponent },
  { path: 'requests/l/:term', component: RequestsListComponent },
  { path: 'requests/:id', component: RequestDetailsComponent },
  { path: 'createRequest/:id', component: CreateRequestComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
