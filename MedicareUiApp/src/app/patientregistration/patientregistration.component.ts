import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestResourcesService } from '../services/rest-resources.service';

@Component({
  selector: 'app-patientregistration',
  templateUrl: './patientregistration.component.html',
  styleUrls: ['./patientregistration.component.css']
})
export class PatientregistrationComponent implements OnInit {
  myForm:FormGroup;
  selectedImage;
  userType = '';
  constructor(private fb:FormBuilder,private route:Router,private restService:RestResourcesService) {}


  ngOnInit() {
    this.userType = sessionStorage.getItem('uqId');
    this.formInit();
  }

  formInit(){
    this.myForm= this.fb.group({
      SIN : new FormControl(this.userType),
      patient_username: new FormControl(),
      first_name:new FormControl(),
      last_name: new FormControl(),
      dob: new FormControl(),
      gender: new FormControl,
      addresses: new FormControl(),
      patient_mother:new FormControl(),
      mother_number: new FormControl(),
      patient_father: new FormControl(),
      father_number: new FormControl(),
      patient_doctorName: new FormControl(),
      patient_doctorNumber: new FormControl(),
      email: new FormControl()
    })
  }


  onImageAdded(event){
    this.selectedImage = <File>event.target.files[0];
    console.log( this.selectedImage);
  }

  submittedForm(){
    this.restService.imageData = this.selectedImage;
    console.log(this.myForm.value);
    this.restService.registrationData = this.myForm.value;
    this.restService.onPatientDetailsSubmit().subscribe((res)=>{
      // if(res['status'] == 201){
        alert(res['message']);
      // }
    },
    (err)=>{
      console.log(err);
    })
  }

  resetForm(){
    this.myForm.reset();
  }

  goBack(){
    this.route.navigate(['/detailspage']);
  }

}
