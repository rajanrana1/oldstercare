import { Component, OnInit } from '@angular/core';
import { Registration } from 'src/app/models/registration.model';
import { RegistrationService } from 'src/app/services/registration.service';
@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css']
})
export class CreateRegistrationComponent implements OnInit {
  registration: Registration = {
    name: '',
    email: '',
    phone: '',
    dateOfBirth: new Date(9999,1, 1),
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    subscriptionPlan: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactAddress: ''
  };
  submitted= false;
  message = '';
  constructor(private registrationService: RegistrationService){

  }

  ngOnInit(): void {
    
  }  

  save() : void{
    const data = {
      name: this.registration.name,
      email: this.registration.email,
      phone: this.registration.phone,
      dateOfBirth: this.registration.dateOfBirth,
      streetAddress: this.registration.streetAddress,
      city: this.registration.city,
      state: this.registration.state,
      zip: this.registration.zip,
      subscriptionPlan: this.registration.subscriptionPlan,
      emergencyContactName: this.registration.emergencyContactName,
      emergencyContactPhone: this.registration.emergencyContactPhone,
      emergencyContactAddress: this.registration.emergencyContactAddress
    };

    this.registrationService.create(data)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.newRegistration();
        //this.submitted=true;
        this.message='Registration was submitted successfully!';
      },
      error: (e) => console.error(e)      
    });

  }

  newRegistration() : void{
    this.submitted = false;
    this.registration = {
    name: '',
    email: '',
    phone: '',
    dateOfBirth: new Date(9999,1, 1),
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    subscriptionPlan: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactAddress: ''
    };
  }
}
