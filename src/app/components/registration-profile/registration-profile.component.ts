import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/models/request.model';
import { Registration } from 'src/app/models/registration.model';
import { RegistrationService } from 'src/app/services/registration.service';


@Component({
  selector: 'app-registration-profile',
  templateUrl: './registration-profile.component.html',
  styleUrls: ['./registration-profile.component.css']
})
export class RegistrationProfileComponent implements OnInit {
  currentRegistration: Registration = {};
  currentRequest: Request = {};
  currentIndex = -1;
  constructor(
    private registrationService: RegistrationService, 
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    
      this.getRegistration(this.route.snapshot.params["id"]);
    
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

  setActiveRequest(request: Request, index: number): void {
    this.currentRequest = request;
    this.currentIndex = index;
    this.router.navigate(['/requests/', request.id]);
  }

}
