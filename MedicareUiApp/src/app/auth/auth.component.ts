import { Component, OnInit } from '@angular/core';
import {FormsModule,NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { RestResourcesService } from '../services/rest-resources.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  myForm:NgForm
  selections= {
    userName:'',
    password:''
  };
  registerSelection = {
    patient_id:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    repassword:''
  }
  errorDisplayFlag:boolean = false;
  errorDisplay:string='';
  register:boolean=false;
  errorRegdisplayFlag:boolean=false;
  errorRegdisplay:string = '';
  roleFlag : boolean = false;
  activeTab : string = 'User';
  constructor(private restService :RestResourcesService, private route:Router){}

  ngOnInit(){
    console.log(this.myForm);
  }
  matchPass(){
    let pass = this.registerSelection.password.toLowerCase();
    let repass = this.registerSelection.repassword.toLowerCase();
    if(pass === repass) return true;
    else return false;
  };

  onRegisterSubmit(){
    var data = this.matchPass();
    if(!data) {
      this.errorRegdisplayFlag = true;
      this.errorRegdisplay = "Password doesnot match!"
      return;
    };

    this.restService.onLoginRegisterBody = this.registerSelection;
    this.restService.onRegisterSubmit().subscribe((res)=>{
      this.errorRegdisplayFlag = true;
      this.errorRegdisplay = res['message'] + 'going back to Login ';
      this.registerSelection = {
        patient_id:'',
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        repassword:''
      }
      setTimeout(()=>{
        this.errorRegdisplayFlag = false;
        this.onRegister()
      },2000 )
    },
    (err)=>{
      if(err.status == 409){
        this.errorRegdisplayFlag = true;
        this.errorRegdisplay = 'Email already exits! Please try another.';
      }else if(err.status == 500){
        this.errorDisplayFlag = true;
        this.errorDisplay = 'Server is down. Please try again later!';
        return;
      } 
      else{
        this.errorDisplayFlag = true;
        this.errorDisplay = 'Unknown error from server! Please try after sometime.';
        return;
      }
    });
  }

  onLogin(){
    this.restService.onLoginBody = this.selections;
    this.restService.onLoginSubmit().subscribe((res)=>{
      this.errorDisplayFlag = false;
      sessionStorage.setItem('token',res['token']);
      sessionStorage.setItem('uqId',res['type']);
      this.route.navigate(['/detailspage']);
    },
    (err)=>{
      if(err.status == 404){
        this.errorDisplayFlag = true;
        this.errorDisplay = 'Authentication failed!';
        return;
      }
      else if(err.status == 500){
        this.errorDisplayFlag = true;
        this.errorDisplay = 'Server is down. Please try again later!';
        return;
      } 
      else{
        this.errorDisplayFlag = true;
        this.errorDisplay = 'Unknown error from server! Please try after sometime.';
        return;
      } 
    })
  }

  generateID(){
    var text = "" , len = 15;
    var possible = "+_)(*&^%$#@!~abcdefghijklmno01234JKLMNOPQRSTUVWXYZ+_)(*&^%$#@!~56789ABCDEFGHIpqrstuvwxyz0123456789+_)(*&^%$#@!~";
    for(var i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  onRegister(){
    if(this.register == false) {
      this.registerSelection.patient_id = this.generateID();
    }
    this.register == true ? this.register = false : this.register = true;
  }

  roleChange(event){
    event.target.innerText != "Admin" ? this.activeTab = "User" : this.activeTab = "Admin";
    event.target.innerText != "Admin" ? this.roleFlag = false : this.roleFlag = true;
  }

}
