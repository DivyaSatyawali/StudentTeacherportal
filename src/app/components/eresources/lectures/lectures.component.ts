import { AuthService } from './../../../services/auth.service';
import { LecturesService } from "./../../../services/lectures.service";
import { LECTURE } from "./../../../models/lecture.model";
import { Component, OnInit } from "@angular/core";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: "app-lectures",
  templateUrl: "./lectures.component.html",
  styleUrls: ["./lectures.component.css"]
})
export class LecturesComponent implements OnInit {
  constructor(private lecturesService: LecturesService,private authService:AuthService,private _snackBar: MatSnackBar) {}
  lecture = new LECTURE();
  previous_lectures ;
  fileToUpload: File;
  thumbnailUrl;
  videoUrl;
  ngOnInit() {
    this.authService.isUserLoggedIn('/lectures')

    this.authService.getUserName().subscribe((data)=>{
      this.lecture.instructor = data.name
    })
  }

  setPreviousLectures = () =>{
    this.lecturesService.getLectures().subscribe((data)=>{
      this.previous_lectures = data
    })
  }
  onImagePicked(file: FileList) {
    this.lecture.thumbnail = file.item(0);
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.thumbnailUrl = event.target.result;
    };
    reader.readAsDataURL(this.lecture.thumbnail);
  }

  onSubmit() {
    this.lecturesService.addLecture(this.lecture).subscribe((data)=>{
        console.log(data)
        this._snackBar.open(data.message , "close",{duration: 5000});
      
    })
  }
  isFilesUploaded(){
    if(!this.videoUrl && !this.thumbnailUrl){
      this._snackBar.open("Please provide video and its thumbnail" , "close",{duration: 5000});
      return false;
    }else if(!this.videoUrl ){
      this._snackBar.open("Please provide video" , "close",{duration: 5000});
      return false;
    }else if(!this.thumbnailUrl ){
      this._snackBar.open("Please provide thumbnail" , "close",{duration: 5000});
      return false;

    }
      return true
    

  }
  onVideoPicked(file: FileList) {
    this.videoUrl = null;
    this.lecture.video = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.videoUrl = event.target.result;
    };
    reader.readAsDataURL(this.lecture.video);

  }
}
