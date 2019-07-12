import { AuthService } from './../../services/auth.service';
import { EventsService } from './../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { EVENT } from '../../models/event.model';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  years : string[] = ['SIG','WorkShop','Fest'];
  picker;
  events ;
  
  constructor(private eventsService:EventsService,private authService:AuthService) { }

  ngOnInit() {
    this.authService.isUserLoggedIn('/event')
    // this.authService.isUserLoggedIn('/enrollment')
    this.eventsService.getEvents().subscribe((data)=>{
      this.events = data 
    })
    // this.event = {
    //   event_title:"EVENT TITLE",
    //   organisating_chapter:"MAIT",
    //   date:"01/02/2019",
    //   time:"00:12",
    //   link:"www.ge.com",
    //   event_type:"SIG",
    //     description:"nothing",
    //     event_poster:"https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    // }
  }

  // deleteEvent(index){
  //   this.events = this.events.splice(index,1);

  // }
 deleteEvent(id){
    console.log(id)
    this.events = this.events.filter(({_id})=>id!== _id)
    // this.eventsService.deleteEvent(id).subscribe((data)=>{
    //   console.log("done")
    //   this.deleted.emit('delete')
    //   // this.eventComponent.deleteEvent(id)
    // })
  }
}
