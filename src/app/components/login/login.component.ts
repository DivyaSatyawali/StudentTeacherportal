import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output()
  login = new EventEmitter<string>();
  color="primary"
  username:String;
  password:String;
  errorMessage:String;

  constructor(private authService:AuthService,private router: Router,  private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.isUserLoggedIn('/enrollment')
  }
  onSubmit(){
    this.authService.loginUser(this.username,this.password).subscribe((data)=>{
        if(data.token){
          this.authService.setUser(data);
          this.authService.setUserTokenToCookie(data.token)
          this.login.emit('login')
          this.authService.isUserLoggedIn('/enrollment');

        }
        else if(data.message){
      this._snackBar.open(data.message , "close",{duration: 5000});

          // this.errorMessage = data.message;
          
        }
        else{
      this._snackBar.open("Wrong Email or Password" , "close",{duration: 5000});

          // this.errorMessage = "Wrong Email or Password";
        }
    },error =>{
      console.log(error)
      this._snackBar.open(error.error.message , "close",{duration: 5000});

    })
  }
}
