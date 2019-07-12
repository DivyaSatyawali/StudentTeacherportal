import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import API_URL from '../config/API_URL';
import { REIMBURSEMENT } from '../models/reimbusement.models';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  convertObjectToFormData(form){
    const FS = new FormData();
    for(let key in form){
      console.log(key,form[key])
      if(typeof form[key] === 'object'){
        for(let i =0; i < form[key].length; i++){
          FS.append(key, form[key][i], form[key][i]['name']);
      }
      //   console.log("---------")
      // console.log(key,form[key]);
      // FS.append(key,JSON.stringify(form[key]))
      }
      else{
        FS.append(key,form[key])
      }
        
    }
    return FS
  }
  httpOptions = {
    headers: new HttpHeaders({
       'authorization': this.authService.getUserToken()
    })
  };
  getReimbursement(){
    return this.http.get(`${API_URL}reimbursement/fetch`,this.httpOptions);
  }
  deleteReimbursement(){

  }
  addReimbursement(form):Observable<REIMBURSEMENT>{

    const data = this.convertObjectToFormData(form);

    return this.http.post<REIMBURSEMENT>(`${API_URL}reimbursement/upload`,data,this.httpOptions)
  }
  
}
