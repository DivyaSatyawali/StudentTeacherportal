import { MatSnackBar } from '@angular/material/snack-bar';
import { StarPerformerService } from './../../services/star-performer.service';
import { AuthService } from "./../../services/auth.service";
import { EnrollmentsService } from "./../../services/enrollments.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-star-performer",
  templateUrl: "./star-performer.component.html",
  styleUrls: ["./star-performer.component.css"]
})
export class StarPerformerComponent implements OnInit {
  monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  constructor(
    private StarPerformerService:StarPerformerService,
    private enrollmentsService: EnrollmentsService,
    private _snackBar: MatSnackBar,
              private authService:AuthService
    ) {}
  month;
  enrollments;

  ngOnInit() {
    this.authService.isUserLoggedIn('/star-performer');
    this.month = String(new Date().getMonth() + 1);
    this.enrollmentsService.getEnrollments().subscribe(data => {
      this.enrollments = data;
      console.log(data);
    });
}

  requestStarPerformer = (id) =>{
    this.StarPerformerService.requestStarPerformer(id).subscribe(data =>{
      this._snackBar.open(data.message , "close",{duration: 5000});
    },err =>{
      console.log(err)
      this._snackBar.open(err.error.message , "close",{duration: 5000});
    })
  }
}
