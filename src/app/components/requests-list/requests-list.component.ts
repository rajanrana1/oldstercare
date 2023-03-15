import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/models/request.model';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {
  requests?: Request[];
  currentRequest: Request = {};
  currentIndex = -1;
  registrationId = '';
  newRequest=0;
  booked=0;
  completed=0;
  constructor(private requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.registrationId = this.route.snapshot.params["term"];
    if(this.registrationId == '-1'||this.registrationId == ''){
      this.retrieveRequests();
    }else{
      this.searchRequest();
    }  
  }

  calculateRequests():void{
    this.newRequest = this.requests?.filter(x=>x.status == "New").length || 0;
    this.booked = this.requests?.filter(x=>x.status == "Booked").length || 0;
    this.completed = this.requests?.filter(x=>x.status == "Completed").length || 0;
  }

  retrieveRequests(): void {
    this.requestService.getAll()
      .subscribe({
        next: (data) => {
          this.requests = data;
          this.calculateRequests();
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveRequests();
    this.currentRequest = {};
    this.currentIndex = -1;
  }

  setActiveRequest(request: Request, index: number): void {
    //this.currentRequest = request;
    //this.currentIndex = index;
    this.router.navigate(['/requests/', request.id]);
  }

  removeAllRequests(): void {
    this.requestService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchRequest(): void {
    this.currentRequest = {};
    this.currentIndex = -1;
    this.requestService.findByRegistrationId(this.registrationId)
      .subscribe({
        next: (data) => {
          this.requests = data;
          this.calculateRequests();
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
