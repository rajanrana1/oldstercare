import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/models/request.model';
import { Registration } from 'src/app/models/registration.model';
import { RequestService } from 'src/app/services/request.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
  currentRegistration: Registration = {};
  request: Request = {
    registrationId: '',
    service: '',
    pickupPoint: '',
    destination: '',
    appointmentDate: new Date(),
    pickupDate: new Date(),
    appointmentTime: new Date(),
    pickupTime: new Date(),
    wheelChairAssisstance: false,
    userComments: '',
    status: '',
    comments: '',
    vendor: '',
    contactPerson: '',
    contactNumber: '',
  };
  submitted= false;
  message = '';
  constructor(private requestService: RequestService,
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router){
      this.request.registrationId = this.route.snapshot.params["id"];
  }

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

  save() : void{
    const data = {
      registrationId: this.request.registrationId,
      service: this.request.service,
      pickupPoint: this.request.pickupPoint,
      destination: this.request.destination,
      appointmentTime: this.request.appointmentDate + ' ' + this.request.appointmentTime,
      pickupTime: this.request.pickupDate + ' ' + this.request.pickupTime,
      wheelChairAssisstance: this.request.wheelChairAssisstance,
      userComments: this.request.userComments,
      status: this.request.status,
      comments: this.request.comments,
      vendor: this.request.vendor,
      contactPerson: this.request.contactPerson,
      contactNumber: this.request.contactNumber,

    };

    this.requestService.create(data)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.newRequest();
        this.message = 'Request was submitted successfully!';
        //this.submitted=true;
      },
      error: (e) => console.error(e)      
    });

  }

  newRequest() : void{
    this.submitted = false;
    this.request = {
      registrationId: '',
      service: '',
      pickupPoint: '',
      destination: '',
      appointmentDate: new Date(),
      pickupDate: new Date(),
      appointmentTime: new Date(),
      pickupTime: new Date(),
      wheelChairAssisstance: false,
      userComments: '',
      status: '',
      comments: '',
      vendor: '',
      contactPerson: '',
      contactNumber: '',
    };
  }
}
