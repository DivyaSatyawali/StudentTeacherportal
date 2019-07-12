import { LECTURE } from './../models/lecture.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import API_URL from '../config/API_URL';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturesService {

  constructor(private authService:AuthService,private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
   
       'authorization': this.authService.getUserToken()

    }),
    reportProgress:true,
  
  };
  convertObjectToFormData(form){
    const FS = new FormData();
    for(let key in form){
        FS.append(key,form[key])
    }
    return FS
  }
  addLecture(form):Observable<LECTURE>{
    const data = this.convertObjectToFormData(form)
    return this.http.post<LECTURE>(`${API_URL}lectures/create`,data, this.httpOptions);
    
  }
  getLectures():Observable<LECTURE[]>{

    return this.http.get<LECTURE[]>(`${API_URL}lectures/fetch_my_lectures`,this.httpOptions);
  }
  editLecture(){

  }
  removeLecture(){

  }
 
}
