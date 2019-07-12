import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { EnrollmentsService } from "../../services/enrollments.service";
import { AuthService } from "../../services/auth.service";

import { FS } from "../../models/form.model";
import { mimeType } from "./mime-type.validator";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  yearsControl = new FormControl("", [Validators.required]);

  activeFormIndex = 0;
  years: string[] = ["First", "Second", "Third", "Fourth"];
  formsnumber = new FS();
  formArray = [];

  isLastFormSaved = true;
  fileToUpload: File;
  constructor(
    private enrollmentsService: EnrollmentsService,
    private authService: AuthService,
    private _snackBar: MatSnackBar

  ) {}
  ngOnInit() {
    this.authService.isUserLoggedIn('/enrollment')
    this.formArray.push(this.formsnumber);
    this.setChapter();
    console.log(this.formArray);
    // this.flagArray.push(true);
    // this.flagArray2.push(true);
  }
  setChapter() {
    this.authService.getUserChapter().subscribe(chapter => {
      this.formArray[this.activeFormIndex].college = chapter.chapter;
    });
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
  saveForm(form,i) {
    const data = {
      username: form.username,
      college: form.college,
      email: form.email,
      phone: form.phone,
      year: form.year,
      filename: this.fileToUpload
    };
    this.isLastFormSaved = false;
    if(!this.formArray[i]._id){
    this.enrollmentsService.saveEnrollmemt(data).subscribe(data => {
      console.log(data)
      this._snackBar.open(data.message, "close", { duration: 5000 });
      this.fileToUpload = null;
      this.formArray[i].filename = null;
      if (data._id) {
        this.isLastFormSaved = true;
        this.formArray[i]._id = data._id

      }
    },err => {
      this._snackBar.open(err.error.message, "close", { duration: 5000 });
      this.editForm(i)
    })
    }
    else{
      this.enrollmentsService.updateEnrollments(this.formArray[i]).subscribe(data=>{
        this._snackBar.open(data.message, "close", { duration: 5000 });
        this.fileToUpload = null;
        this.formArray[i].filename = null;

      },err => {
        console.log(err)
        this._snackBar.open(err.error.message, "close", { duration: 5000 });
        this.editForm(i)
      })
    }
  }
  addNewform() {
    // console.log(this.formArray)

    // const isOldForm = this.formArray.filter(form => form.email === this.formArray[this.activeFormIndex].email)

    // this.onSignup(this.formArray[this.activeFormIndex],this.activeFormIndex)

    if (this.formArray[this.activeFormIndex].isValid) {
      // console.log("true")
      // console.log(this.formsnumber);
      this.formArray[this.activeFormIndex] = this.formsnumber;
      this.saveForm(this.formsnumber,this.activeFormIndex);

      this.activeFormIndex += 1;
      if (!this.formArray[this.activeFormIndex]) {
        this.formsnumber = new FS();
        this.formArray.push(this.formsnumber);
        this.setChapter();
      }

    } else {
      this.formArray[this.activeFormIndex].isValid = true;
      this.saveForm(this.formsnumber,this.activeFormIndex);
      this.formsnumber = new FS();
      this.formArray.push(this.formsnumber);
      this.activeFormIndex = this.formArray.length - 1;
      this.setChapter();
    }
    this.updateScroll();
    // this.flagArray.push(true);
  }
  isActive = index => index === this.activeFormIndex;
  removeForm(index) {
    this.enrollmentsService
      .deleteEnrollment(this.formArray[index]._id)
      .subscribe(data => {
        this._snackBar.open(data.message, "close", { duration: 5000 });
        this.formArray.splice(index, 1);
        this.activeFormIndex -= 1;
        this.formsnumber = this.formArray[this.activeFormIndex];
        console.log(this.activeFormIndex);
      },err=>{
        this._snackBar.open(err.error.message, "close", { duration: 5000 });

      });
   
    // this.flagArray.splice(index,1);
  }
  saveAllEnrollments(form) {
    console.log(form);
    console.log(this.formArray);

    //  this.flagArray2[index+1]=true;
  }
  editForm(i) {
    this.activeFormIndex = i;
    this.formsnumber = this.formArray[this.activeFormIndex];
    this.updateFormsArray();
  }
  onImagePicked(file: FileList) {
    this.fileToUpload = file.item(0);
    this.formsnumber.filename = file.item(0).name;

    // var reader = new FileReader();
    // reader.onload = (event:any) => {
    //    this.formsnumber.filename = event.target.result;
    // }
    // reader.readAsDataURL(this.fileToUpload);
  }
  updateFormsArray() {
    this.formArray = this.formArray.filter(form => form.isValid);
  }
}
