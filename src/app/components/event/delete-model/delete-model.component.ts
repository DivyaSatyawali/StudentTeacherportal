import { Component, OnInit , EventEmitter,Output,Inject} from '@angular/core';
import { EventsService } from './../../../services/events.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MissionService } from '../../../services/e.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
@Component({
  selector: 'app-delete-model',
  templateUrl: './delete-model.component.html',
  styleUrls: ['./delete-model.component.css']
})
export class DeleteModelComponent implements OnInit {
@Output() del= new EventEmitter<string>();
  constructor(public dialogRef: MatDialogRef<DeleteModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data,private MS : MissionService,private eventsService:EventsService,private _snackBar: MatSnackBar) { }
   
   onNoClick(): void {
      this.dialogRef.close();
    } 

  ngOnInit() {
  	console.log(this.data);
  }
    deleteEvent(){
    console.log(this.data);
    this.eventsService.deleteEvent(this.data).subscribe((data)=>{
      this.MS.emits(this.data);
      console.log(this.del);
      this._snackBar.open("Event is deleted successfully", "close",{duration: 5000});
      
      // this.eventComponent.deleteEvent(id)
    })
  }

}
