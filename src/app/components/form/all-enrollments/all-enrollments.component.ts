import { RoleChangeWarningComponent } from './role-change-warning/role-change-warning.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from "./../../../services/auth.service";
import { EnrollmentsService } from "./../../../services/enrollments.service";
import { Component, OnInit } from "@angular/core";
import { FS } from "../../../models/form.model";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-all-enrollments",
  templateUrl: "./all-enrollments.component.html",
  styleUrls: ["./all-enrollments.component.css"]
})
export class AllEnrollmentsComponent implements OnInit {
  yearsControl = new FormControl("", [Validators.required]);

  activeFormIndex = 0;
  years: string[] = ["First", "Second", "Third", "Fourth"];

  formsnumber = new FS();
  formArray = [];
  roles = [];
  imgUrl: string;

  fileToUpload: File;
  constructor(
    private enrollmentsService: EnrollmentsService,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {}
  ngOnInit() {
    this.authService.isUserLoggedIn("/all-enrollment");
    this.enrollmentsService.getEnrollments().subscribe(data => {
      this.formArray = data;
      console.log(data);
    });
    this.setAvailableRoles();
    // this.flagArray.push(true);
    // this.flagArray2.push(true);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RoleChangeWarningComponent, {
      // width: '',
      data: this.formArray[this.activeFormIndex]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
  setAvailableRoles = () => {
    this.enrollmentsService.getAllRoles().subscribe(data => {
      this.roles = data.roles;
      console.log(data);
    });
  };

  changeRoleRequest = (role,i) => {
    console.log(role)
    this.openDialog()
  };
 

  updateScroll() {
    var element = document.getElementById("main");
    element.scrollTop = element.scrollHeight;
  }
  isUniqueEmailAndPhone = i => {
    const email = this.formArray.every((form, index) => {
      return form.email === this.formsnumber.email ? index === i : true;
    });
    const phone = this.formArray.every((form, index) => {
      return form.phone === this.formsnumber.phone
        ? index === i
        : true && this.formArray[i].phone.length === 10;
    });
    if (!email) {
      this.formsnumber.email = "";
    }
    if (!phone) {
      this.formsnumber.phone = "";
    }
    return email && phone;
  };
  isActive = index => index === this.activeFormIndex;
  removeForm(index) {
    this.enrollmentsService
      .deleteEnrollment(this.formArray[index]._id)
      .subscribe(data => {
        this._snackBar.open(data.message, "close", { duration: 5000 });
      });

    this.formArray.splice(index, 1);
    // this.activeFormIndex += 1
    this.formsnumber = this.formArray[this.activeFormIndex];
    console.log(this.activeFormIndex);
  }
  saveAllEnrollments(form) {
    console.log(form);
    console.log(this.formArray);

    //  this.flagArray2[index+1]=true;
  }
  setActiveForm(i) {
    this.activeFormIndex = i;
    console.log(this.formArray[this.activeFormIndex]);
    this.formsnumber = this.formArray[this.activeFormIndex];
    this.fileToUpload = null;
    // this.updateFormsArray();
  }
  editForm(i) {
    console.log("caleed");

    let data = this.formArray[i];
    if (this.fileToUpload) {
      Object.assign(data, { filename: this.fileToUpload });
    }
    this.enrollmentsService.updateEnrollments(data).subscribe(data => {
      this._snackBar.open(data.message, "close", { duration: 5000 });
    });
    // console.log(this.formArray[i])
    // console.log(this.fileToUpload)
    //  const data =
    //  this.enrollmentsService.updateEnrollments()
  }
  onImagePicked(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  // updateFormsArray(){
  //   this.formArray = this.formArray.filter(form => form.isValid)
  // }
}
