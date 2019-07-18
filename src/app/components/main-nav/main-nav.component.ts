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
userLoggedIn = false;
in=false;
in2=false;
in3=false;
in4=false;
in5=false;
// href = this.route.snapshot._routerState.url;
ngOnInit(){
  // this.href = this.route.url;
  // console.log(this.href)
  this.isUserLoggedIn();
}

  showEvents(){
    if(this.hiddenEvents)
      this.in2=true;
    else
      this.in2=false;
    this.hiddenEvents =  !this.hiddenEvents;
    this.in = false;
    this.in3 = false;
    this.in4 = false;
    this.in5 = false;
  }
  showEnrollments(){
    if(this.hiddenEnrollments)
      this.in=true;
    else
      this.in = false;
    this.hiddenEnrollments =  !this.hiddenEnrollments;
    this.in2 = false;
    this.in3 = false;
    this.in4 = false;
    this.in5 = false;
  }
  showReimbursement(){
    if(this.hiddenReimbursement)
      this.in3=true;
    else
      this.in3=false;
    this.hiddenReimbursement=  !this.hiddenReimbursement;
    this.in = false;
    this.in2 = false;
    this.in4 = false;
    this.in5 = false;
  }
  showEResources(){
    if(this.hiddenEResources)
      this.in4=true;
    else
      this.in4=false;
    this.hiddenEResources = !this.hiddenEResources;
    this.in = false;
    this.in2 = false;
    this.in3 = false;
    this.in5 = false;
  }
  star(){
    this.in = false;
    this.in2 = false;
    this.in3 = false;
    this.in4 = false;
    this.in5 = true;
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
