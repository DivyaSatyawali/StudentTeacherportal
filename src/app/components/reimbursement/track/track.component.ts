import { AuthService } from './../../../services/auth.service';
import { TrackDetailsComponent } from "./../track-details/track-details.component";
import { ReimbursementService } from "./../../../services/reimbursement.service";
import { Component, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";


@Component({
  selector: "app-track",
  templateUrl: "./track.component.html",
  styleUrls: ["./track.component.css"]
})
export class TrackComponent implements OnInit {
  constructor(
    private reimbursementService: ReimbursementService,
    public dialog: MatDialog,
    private authService:AuthService

  ) {}
  allReimbursement;
  activeTrack = null;

  ngOnInit() {
    this.authService.isUserLoggedIn("/track");

    this.reimbursementService.getReimbursement().subscribe(data => {
      this.allReimbursement = data;
    });
  }

  getClassForStatus(i) {
    console.log(this.allReimbursement[i].state);
    if (this.allReimbursement.state === "applied") return "sent";
    else if (this.allReimbursement.state === "seen") return "seen";
    else if (this.allReimbursement.state === "confirmed") return "confirmed";
    else if (this.allReimbursement.state === "denied") return "denied";
    else return "sent";
  }

  formatDescription(str) {
    if (str.length > 230) {
      return (
        str
          .split("")
          .slice(0, 230)
          .join("") + "..."
      );
    }
    return str;
  }
  showTrackDetails(i) {
    // console.log("hekkkk")
    this.activeTrack = i;
    console.log(this.activeTrack);
  }

  openDialog(i): void {
    const dialogRef = this.dialog.open(TrackDetailsComponent, {
      // width: '',
      data: this.allReimbursement[i]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
