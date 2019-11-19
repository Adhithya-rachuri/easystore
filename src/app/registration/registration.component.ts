import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isDisabled = '';
  city = '';
  state = '';
  zip = '';
  pass1: string;
  pass2: string;
  errorStyle = 'none';
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onChangeCountry() {
    if (this.isDisabled == '') {
      this.city = '';
      this.state = '';
      this.zip = '';
    }
  }

  checkPasswordMatching(){
    if(this.pass1 !== this.pass2){
      console.log("Matching Error")
      this.errorStyle="solid 2px red"
    }else{
      this.errorStyle = "none"
    }
  }

}
