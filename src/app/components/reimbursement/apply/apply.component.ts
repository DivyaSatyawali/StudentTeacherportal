import { AuthService } from './../../../services/auth.service';
import { ReimbursementService } from "./../../../services/reimbursement.service";
import { EventsService } from "./../../../services/events.service";
import { Component, OnInit } from "@angular/core";
import { REIMBURSEMENT } from "../../../models/reimbusement.models";
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: "app-apply",
  templateUrl: "./apply.component.html",
  styleUrls: ["./apply.component.css"]
})
export class ApplyComponent implements OnInit {
  AppliedForms = [];
  Form = new REIMBURSEMENT();
  fileToUpload: File;
  events;
  constructor(
    private eventsService: EventsService,
    private reimbursementService: ReimbursementService,
    private _snackBar: MatSnackBar,
    private authService:AuthService

  ) {}

  ngOnInit() {
    this.authService.isUserLoggedIn('/apply')
    this.AppliedForms.push(this.Form);
    this.eventsService.getEventsList().subscribe(data => {
      this.events = data;
    });
  }

  // addNewForm(){

  //   this.Form =  new REIMBURSEMENT();
  //   this.AppliedForms.push(this.Form);

  // }

  // removeForm(i){
  //   this.AppliedForms.splice(i,1);

  // }
  onSubmit() {
    console.log(this.Form);

    this.reimbursementService.addReimbursement(this.Form).subscribe(data => {
      this._snackBar.open(data.message , "close",{duration: 5000});
    
    });
  }
  isfileToUpload(){
    if(!this.fileToUpload){
    this._snackBar.open("Bills are not uploaded" , "close",{duration: 5000});
    }
    return this.fileToUpload
  }
  onDescriptionChange() {
    console.log(this.Form.description);
  }
  onImagePicked(files:any ) {
   
    if(files.length > 5){
    this._snackBar.open("You cannot upload more than 5 bills" , "close",{duration: 5000});
    }else{
      this.Form.bill_image = <Array<File>>files;
      this.fileToUpload = files;
    }
  }
}
