import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from 'src/app/models/registration.model';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.css']
})
export class RegistrationDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentRegistration: Registration = {
    
  };
  
  message = '';
  constructor(
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getRegistration(this.route.snapshot.params["id"]);
    }
  }

  getRegistration(id: string): void {
    this.registrationService.get(id)
      .subscribe({
        next: (data) => {
          this.currentRegistration = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateStatus(status: boolean): void {
    const data = {
      name: this.currentRegistration.name,
      email: this.currentRegistration.email,
      status: status
    };
    this.message = '';
    this.registrationService.update(this.currentRegistration.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentRegistration.status = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  updateRegistration(): void {
    this.message = '';
    this.registrationService.update(this.currentRegistration.id, this.currentRegistration)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Registration was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  deleteRegistration(): void {
    this.registrationService.delete(this.currentRegistration.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/registrations']);
        },
        error: (e) => console.error(e)
      });
  }

}
