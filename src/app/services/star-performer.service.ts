import  API_URL from 'src/app/config/API_URL';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RESPONSE_MESSAGE } from '../models/response_message.model';

@Injectable({
  providedIn: 'root'
})
export class StarPerformerService {

  constructor(private http:HttpClient, private AuthService:AuthService) { }
  httpOptions = {
    headers: new HttpHeaders({
       'authorization': this.AuthService.getUserToken()
    })
  };
  requestStarPerformer(id):Observable<RESPONSE_MESSAGE>{
    return this.http.post<RESPONSE_MESSAGE>(`${API_URL}star_performer/request_star_performer`,{id},this.httpOptions);
  }


}
