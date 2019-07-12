import { AuthService } from "./../../../services/auth.service";
import { EventsService } from "./../../../services/events.service";
import { Component, OnInit } from "@angular/core";
import { EVENT } from "../../../models/event.model";
import { ActivatedRoute, Params } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.css"]
})
export class AddEventComponent implements OnInit {
  color = "primary";
  event = new EVENT();
  chapterList = [
    "Delhi Technological University",
    "Maharaja Agrasen Institute of Technology",
    "HMR Institute of Technology & Management",
    "Guru Tegh Bahadur Institute of Technology",
    "ABV, Indian Institute of Information Technology and Management, Gwalior",
    "Bharati Vidyapeeth's College of Engineering",
    "BML Munjal University",
    "Maitreyi College, Delhi University",
    "Hansraj College, Delhi University",
    "Manipal University",
    "SRM Institute Of Science And Technology, NCR Campus",
    "University School of Information, Communication and Technology",
    "Shaheed Sukhdev College of Business Studies",
    "Indira Gandhi Delhi Technical University for Women",
    "Jadavpur University",
    "Maharaja Surajmal Institute of Technology",
    "Shri Mata Vaishno Devi University",
    "ITS Engineering College",
    "Other"
  ];

  fileToUpload: File;
  isImage: boolean = false;
  isUpdating: boolean = false;
  id:String;
  constructor(
    private eventsService: EventsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if(this.route.snapshot){
     // const url = this.route.snapshot._routerState.url;

    //this.authService.isUserLoggedIn(url)
    }
  
    this.route.params.forEach((params: Params) => {
      this.id = params["id"];
      if (this.id) {
        this.isUpdating = true;
        this.eventsService.getOneEvent(this.id).subscribe(data => {
          this.event = data;
        });
      } else {
        this.authService.getUserChapter().subscribe(data => {
          this.event.chapter = data.chapter;
        });
      }
    });
  }

  onSubmit() {
    const {
      title,
      chapter,
      date,
      time,
      link,
      eventType,
      description,
    } = this.event;
    const event = {
      title: title,
      chapter: chapter,
      date,
      time,
      link,
      eventType: eventType,
      description,
      poster: this.fileToUpload
    };
    console.log("done done")
    if(!this.isUpdating){
    this.eventsService.addEvent(event).subscribe(data => {
      this._snackBar.open(data.message , "close",{duration: 5000});
      // this.event = new EVENT();
    });
    }
    else{
      
      this.eventsService.updateEvent(this.id,event).subscribe((data)=>{
        this._snackBar.open(data.message , "close",{duration: 5000});
      })
      // this.eventsService.updateEvent(event).subscribe(data => {
      //   this.event = new EVENT();
      // });
    }
  }

  showEvent() {
    console.log(this.event);
  }
  imageAdded() {
    this.isImage = true;
  }

  onImagePicked(file: FileList) {
    this.imageAdded();
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.event.poster = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  isValidForm(Form) {
    return !Form.valid && this.isImage;
  }

  // AddOrRemoveType(type){
  //   if(!this.event.event_type.includes(type)){
  //   this.event.event_type.push(type)
  //   }else{
  //     this.event.event_type =  this.event.event_type.filter((this_type)=>this_type !== type)
  //   }
  //   console.log(this.event.event_type)
  // }
}
