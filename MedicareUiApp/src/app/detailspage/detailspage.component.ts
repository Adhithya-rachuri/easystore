import { Component, OnInit } from '@angular/core';
import { RestResourcesService } from '../services/rest-resources.service';

@Component({
  selector: 'app-detailspage',
  templateUrl: './detailspage.component.html',
  styleUrls: ['./detailspage.component.css']
})
export class DetailspageComponent implements OnInit {
  data = {};
  constructor(private restService: RestResourcesService) { }

  ngOnInit() {
    this.restService.onGetPatient().subscribe(
    (res)=>{
      this.data = res;
      console.log(res);
    },
    (err)=>{
      console.log(err);
    })
  }

  onGetAllPatients(){
  }
}
