import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestResourcesService {
  baseUrl = 'http://localhost:3000';
  onLoginRegisterBody={};
  onLoginBody={};
  registrationData = {};
  tokenOne = '';
  imageData:any;
  SIN:string = '';

  constructor(private http:HttpClient) { }

  onRegisterSubmit(){
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.post(this.baseUrl+'/api/signup',this.onLoginRegisterBody, {headers:headers});
  }

  onLoginSubmit(){
    let headers= new HttpHeaders();
    headers.append('content-type','application/json');
    return this.http.post(this.baseUrl+'/api/login',this.onLoginBody,{headers:headers});
  }

  onGetPatientDetails(){
    let headers=new HttpHeaders();
    headers.append('content-type', 'application/json');
    // headers.append('token',sessionStorage.getItem('token'));
    return this.http.get(this.baseUrl+'/api/patients',{headers:headers});
  }
  
  onGetPatient(){
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    let data = {"SIN":sessionStorage.getItem('uqId')}
    return this.http.post(this.baseUrl+'/api/patient1',data,{headers:headers});
  }

  onPatientDetailsSubmit(){
    let patientData = new FormData();
    for(var key in this.registrationData){
        patientData.append(key,this.registrationData[key]);
    }
    patientData.append('image',this.imageData,this.imageData.name);
    this.tokenOne =  sessionStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ this.tokenOne});
    return this.http.post(this.baseUrl+ '/api/patient',patientData,{headers:headers});
  }

}
