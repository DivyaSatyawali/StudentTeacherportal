import { MatSnackBar } from '@angular/material/snack-bar';
import { EnrollmentsService } from './../../../../services/enrollments.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-role-change-warning',
  templateUrl: './role-change-warning.component.html',
  styleUrls: ['./role-change-warning.component.css']
})
export class RoleChangeWarningComponent implements OnInit {
  constructor(private enrollmentsService:EnrollmentsService,
    public dialogRef: MatDialogRef<RoleChangeWarningComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data) { }
    
    onNoClick(): void {
      this.dialogRef.close();
    }


  ngOnInit() {

  }

  removeActive(){
    
    console.log("removing");
  }
  sendRequest = () =>{
    const data = {
      id:this.data._id,
      role:this.data.role

    }
    this.enrollmentsService.sendRoleRequests(data).subscribe((res)=>{
  
      this._snackBar.open(res.message, "close", { duration: 5000 });
      this.onNoClick()
    },err =>{
      console.log(err)
      this._snackBar.open(err.error.message, "close", { duration: 5000 });
      this.onNoClick()

    })

  }
}
