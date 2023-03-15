import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/models/request.model';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentRequest: Request = {
    registrationId: '',
    service: '',
    pickupPoint: '',
    destination: '',
    appointmentDate: new Date(9999,1,1),
    pickupDate: new Date(9999,1,1),
    appointmentTime: new Date(9999,1,1),
    pickupTime: new Date(9999,1,1),
    wheelChairAssisstance: false,
    userComments: '',
    status: '',
    comments: '',
    vendor: '',
    contactPerson: '',
    contactNumber: '',
    registration:{}
  };
  
  message = '';
  constructor(
    private RequestService: RequestService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getRequest(this.route.snapshot.params["id"]);
    }
  }

  getRequest(id: string): void {
    this.RequestService.get(id)
      .subscribe({
        next: (data) => {
          this.currentRequest = data;
          this.currentRequest.pickupDate = this.currentRequest.pickupTime;
          this.currentRequest.appointmentDate = this.currentRequest.appointmentTime;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateStatus(status: string): void {
    const data = {
      id: this.currentRequest.id,
      registrationId: this.currentRequest.registrationId,
      status: status
    };
    this.message = '';
    this.RequestService.update(this.currentRequest.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentRequest.status = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  updateRequest(): void {
    this.message = '';
    let dates ={
      appointmentTime: this.currentRequest.appointmentDate + ' ' + this.currentRequest.appointmentTime,
      pickupTime: this.currentRequest.pickupDate + ' ' + this.currentRequest.pickupTime
    };

    let data = {...this.currentRequest, ...dates };
    this.RequestService.update(this.currentRequest.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This request was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  deleteRequest(): void {
    this.RequestService.delete(this.currentRequest.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/requests/l/']);
        },
        error: (e) => console.error(e)
      });
  }

}
