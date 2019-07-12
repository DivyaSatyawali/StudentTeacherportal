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
  constructor(private enrollmentsService: EnrollmentsService,
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
}
