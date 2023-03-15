import { Component } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent {
  term='';
  constructor(private router: Router) { }
  searchTerm(): void {
    
    if(this.term=='')return;
    this.router.navigate(['/requests/l/', this.term])
    .then(() => {
      window.location.reload();
    });
  }

}
