import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FS }  from '../models/form.model';
import API_URL from '../config/API_URL';




@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

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
  getEnrollments():Observable<[FS]>{
    return this.http.get<[FS]>(`${API_URL}enrollment/fetch_Chapter_Users`,this.httpOptions);
     
  }

  sendEnrollments(arr){

  }

 

  saveEnrollmemt(form):Observable<FS>{
    const data = this.convertObjectToFormData(form)
    return this.http.post<FS>(`${API_URL}enrollment/newenrollment`,data,this.httpOptions)
  }
  updateEnrollments(form):Observable<FS>{
    const data = this.convertObjectToFormData(form)
    return this.http.put<FS>(`${API_URL}enrollment/update/${form._id}`,data,this.httpOptions)
    
  }
  deleteEnrollment(id):Observable<FS>{
    console.log(id)
    return this.http.delete<FS>(`${API_URL}enrollment/delete/${id}`,this.httpOptions)
  }
}
