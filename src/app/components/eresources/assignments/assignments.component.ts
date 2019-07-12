import { AuthService } from './../../../services/auth.service';
import { AssignmentsService } from "./../../../services/assignments.service";
import { ASSIGNMENT } from "./../../../models/assignment.model";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-assignments",
  templateUrl: "./assignments.component.html",
  styleUrls: ["./assignments.component.css"]
})
export class AssignmentsComponent implements OnInit {
  constructor(
    private assignmentsService: AssignmentsService,
    private _snackBar: MatSnackBar,
    private authService:AuthService
    
  ) {}

  assignment: ASSIGNMENT = new ASSIGNMENT();

  ngOnInit() {
    this.authService.isUserLoggedIn("/assignments");
  }
  onPdfPicked(file: FileList) {
    console.log("pdf picked");
    this.assignment.assignment_pdf = file.item(0);
  }
  isFilesUploaded() {
    if (!this.assignment.assignment_pdf) {
      this._snackBar.open("Please upload assignment Pdf", "close", {
        duration: 5000
      });
      return false;
    }
    return true;
  }
  onSubmit() {
    this.assignmentsService.addAssignment(this.assignment).subscribe(data => {
      this._snackBar.open(data.message, "close", { duration: 5000 });
    });
  }
}
