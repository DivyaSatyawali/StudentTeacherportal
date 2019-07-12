import { REIMBURSEMENT } from './../../../models/reimbusement.models';
import { Component, OnInit, Input, Inject } from '@angular/core';
import API_URL  from '../../../config/API_URL';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.css']
})
export class TrackDetailsComponent {
  // @Input() reimbursement;

  constructor(public dialogRef: MatDialogRef<TrackDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }
    
    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
    console.log(this.data)
  }

  refactoredURL(url){
    return API_URL.split("").splice(0,API_URL.length-1).join("") +url.replace("\\","/")
    
  }

  removeActive(){
    
    console.log("removing");
  }
}
