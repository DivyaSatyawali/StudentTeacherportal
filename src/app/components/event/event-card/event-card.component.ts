import { EventsService } from './../../../services/events.service';
import { EVENT } from '../../../models/event.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventComponent } from '../event.component';
import { ActivatedRoute, Params } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import API_URL from 'src/app/config/API_URL';
import { DeleteModelComponent } from '../delete-model/delete-model.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event:EVENT;
  
  // uploadComplete() {
  //   this.uploaded.emit('complete');
  // }
  posterStyle ;
  bgImg:String;
  imgUrl:String;
  isUpdating:boolean = false;

  constructor(public dialog: MatDialog,private eventsService:EventsService,private route: ActivatedRoute,private _snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params["id"];
      if (id) {
        this.isUpdating = true;
      }
    });
  }
  ngOnChanges(){
    // console.log("colled")
    // this.imgUrl = (this.event.event_poster)?this.event.event_poster:this.defaultImage
    // this.bgImg = 'url('+ this.imgUrl + ')'

  }
  refactoredURL(url){
    if(url.length < 1000){
      return API_URL.slice(0,API_URL.length - 1) + url.replace("\\","/")
    }else{
    return url.replace("\\","/")
    }
  }

  formatDate(str){
    if(str){
      str = str.toString();
    const strArr = str.split(" ");
    let newStr = ""
    for(let i=0;i<4;i++){
      newStr = newStr +" " +strArr[i] 
    }
    
    return newStr;
  }
  }
   openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteModelComponent, {
      // width: '',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
 
}
