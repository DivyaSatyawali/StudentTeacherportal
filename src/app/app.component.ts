import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task2';
    active = false;
  active2 = true;
  hiddenReimbursement=true;
  hiddenEResources=true;
  showReimbursement(){
    this.hiddenReimbursement=  !this.hiddenReimbursement
  }
  showEResources(){
    this.hiddenEResources = !this.hiddenEResources
  }
  openSidenav()
  {
     this.active=true;
     this.active2=false;
  }
  closeNav()
  {
     this.active=false;
     this.active2=true;
  }
}
