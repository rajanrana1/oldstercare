import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Registration } from 'src/app/models/registration.model';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.css']
})
export class RegistrationsListComponent implements OnInit {
  registrations?: Registration[];
  currentRegistration: Registration = {};
  currentIndex = -1;
  name = '';
  constructor(private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.retrieveRegistrations();
  }

  retrieveRegistrations(): void {
    this.registrationService.getAll()
      .subscribe({
        next: (data) => {
          this.registrations = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveRegistrations();
    this.currentRegistration = {};
    this.currentIndex = -1;
  }

  setActiveRegistration(registration: Registration, index: number): void {
    //this.currentRegistration = registration;
    //this.currentIndex = index;
    this.router.navigate(['/registration/', registration.id]);

  }

  removeAllRegistrations(): void {
    this.registrationService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentRegistration = {};
    this.currentIndex = -1;
    this.registrationService.findByTitle(this.name)
      .subscribe({
        next: (data) => {
          this.registrations = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
