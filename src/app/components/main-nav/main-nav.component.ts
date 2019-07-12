import { AuthService } from './../../services/auth.service';
import { Component,OnInit, OnChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
 
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  constructor(private breakpointObserver: BreakpointObserver,private authService:AuthService, private route: ActivatedRoute,) {}
 hiddenReimbursement=true;
  hiddenEResources=true;
hiddenEvents = true;
hiddenEnrollments = true;
userLoggedIn = false

// href = this.route.snapshot._routerState.url;
ngOnInit(){
  // this.href = this.route.url;
  // console.log(this.href)
  this.isUserLoggedIn();
}

  showEvents(){
    this.hiddenEvents =  !this.hiddenEvents;

  }
  showEnrollments(){
    this.hiddenEnrollments =  !this.hiddenEnrollments;

  }
  showReimbursement(){
    this.hiddenReimbursement=  !this.hiddenReimbursement
  }
  showEResources(){
    this.hiddenEResources = !this.hiddenEResources
  }
  isUserLoggedIn(){
    console.log('logging ins')
    this.authService.getUserName().subscribe(data=>{
      this.userLoggedIn = true
    },err=>{
      this.userLoggedIn = false
    })
  }
  logout(){
    this.authService.logout()

  }

}
