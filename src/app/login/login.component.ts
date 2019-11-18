import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myEmail : string = '';
  fColor : string = "#ff0000";
  isOK = false;
  fSize = 23;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  checkEmail(event: Event){
    console.log(event);
    this.myEmail = (<HTMLInputElement> event.target).value;
  }

  loginUser(){
    //Some code to check about the credentials if are correct or not ....

    this.router.navigate(['/home']);
  }

}
