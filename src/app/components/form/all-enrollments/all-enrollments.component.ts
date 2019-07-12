import { AuthService } from './../../../services/auth.service';
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
  imgUrl: string;

  fileToUpload: File;
  constructor(
    private enrollmentsService: EnrollmentsService,
    private _snackBar: MatSnackBar,
    private authService:AuthService
  ) {}
  ngOnInit() {
  this.authService.isUserLoggedIn('/all-enrollment');
    this.enrollmentsService.getEnrollments().subscribe(data => {
      this.formArray = data;
    });
    // this.flagArray.push(true);
    // this.flagArray2.push(true);
  }
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
  // addNewform()
  // {
  //   console.log(this.formArray)

  //  // const isOldForm = this.formArray.filter(form => form.email === this.formArray[this.activeFormIndex].email)

  //  // this.onSignup(this.formArray[this.activeFormIndex],this.activeFormIndex)

  //   if(this.formArray[this.activeFormIndex].isValid){
  //     console.log("true")
  //     console.log(this.formsnumber);
  //     this.formArray[this.activeFormIndex] = this.formsnumber
  //     this.activeFormIndex += 1;
  //     if(!this.formArray[this.activeFormIndex]){
  //       this.formsnumber = new FS();
  //       this.formArray.push(this.formsnumber);
  //     }
  //   }else{
  //   this.formArray[this.activeFormIndex].isValid = true
  //   this.formsnumber = new FS();
  //   this.formArray.push(this.formsnumber);
  //   this.activeFormIndex= this.formArray.length - 1;
  //   }
  //   this.updateScroll()
  //   // this.flagArray.push(true);
  // }
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
