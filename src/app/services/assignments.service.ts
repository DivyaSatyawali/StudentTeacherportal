import { ASSIGNMENT } from './../models/assignment.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import API_URL from '../config/API_URL';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  httpOptions = {
    headers: new HttpHeaders({

       'authorization': this.authService.getUserToken()

    })
  };

  constructor(private http:HttpClient,private authService:AuthService) { }
  convertObjectToFormData(form){
    const fs = new Form();
    for(let key in form){
      fs.append(key,form[key])
    }
    return fs
  }
  addAssignment(form):Observable<ASSIGNMENT>{
    const data = this.convertObjectToFormData(form);
    return this.http.post<ASSIGNMENT>(`${API_URL}assignments/create`,data,this.httpOptions);

  }
  deleteAssignment(){

  }
  editAssignment(){

  }
  getAssignment(){
    
  }
  
}
