import { MODULE } from './../models/module.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import API_URL from '../config/API_URL';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

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
  addModule(form):Observable<MODULE>{
    const data = this.convertObjectToFormData(form);
    console.log("http")
    return this.http.post<MODULE>(`${API_URL}modules/create`,data,this.httpOptions);

  }
  getModule(){

  }
  removeModule(){

  }
  editModule(){
    
  }
}
