import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import API_URL from '../config/API_URL';
import { EVENT } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  httpOptions = {
    headers: new HttpHeaders({
   
       'authorization': this.authService.getUserToken()

    })
  };
  convertObjectToFormData(form){
    const FS = new FormData();
    for(let key in form){
        FS.append(key,form[key])
    }
    return FS
  }
  addEvent(event):Observable<EVENT>{
    
    const data = this.convertObjectToFormData(event);
    return this.http.post<EVENT>(`${API_URL}event/create`,data,this.httpOptions)
  }
  getEvents(){
    
    return this.http.get(`${API_URL}event/fetch`,this.httpOptions)
  }
  getOneEvent(id):Observable<EVENT>{
    return this.http.get<EVENT>(`${API_URL}event/fetchone/${id}`,this.httpOptions)

  }
  deleteEvent(id):Observable<EVENT>{
    console.log("EVENT");
    return this.http.delete<EVENT>(`${API_URL}event/delete/${id}`,this.httpOptions)
  }
  updateEvent(id,event):Observable<EVENT>{
    const data = this.convertObjectToFormData(event);
    return this.http.put<EVENT>(`${API_URL}event/update/${id}`,data,this.httpOptions)
  }
  getEventsList(){
    return this.http.get(`${API_URL}event/get_events_name`,this.httpOptions)
  }
}
