import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {USER} from '../models/user.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = "http://localhost:3000/" ;
  user:USER;
  
  constructor(private router: Router,private http:HttpClient,private cookieService:CookieService ) { }
   httpOptions = {
    headers: new HttpHeaders({

      'Authorization':  this.getUserToken()

    })
  };
  loginUser(username,password):Observable<USER>{

    return this.http.post<USER>(`${this.API_URL}admin/login`,{username,password},this.httpOptions);

  }
  
  setUser(user){
    this.user = user;
  }
  getUserId(){
    return this.user.adminId;

  }
  setUserTokenToCookie(token){
    
    this.cookieService.set('authorization',token)
    this.httpOptions = {
      
      headers: new HttpHeaders({
  
        'Authorization':  this.getUserToken()
  
      })
    };
    
  }
  deleteUserTokenCookie(){
    this.cookieService.delete('authorization')
  }
  getUserName():Observable<any>{
    return this.http.get(`${this.API_URL}admin/fetch_name`,this.httpOptions);
  }
  getUserToken(){
    console.log(this.cookieService.get('authorization'))
    return this.cookieService.get('authorization');
  }
  getUserChapter():Observable<any>{
    return this.http.get(`${this.API_URL}admin/fetch_admin_chapter`,this.httpOptions);
  }
  logout(){
  
    this.deleteUserTokenCookie();
    this.httpOptions = {
      headers: new HttpHeaders({
  
        'Authorization':  this.getUserToken()
  
      })
    };
    this.router.navigate(['/']);
  }
  isUserLoggedIn(route){
    this.getUserName().subscribe(data => {
      console.log(data)
      this.router.navigate([route]);
    },err =>{
      console.log(err);
      this.router.navigate(['/']);
    })

    
  }
}
