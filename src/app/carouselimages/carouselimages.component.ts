import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carouselimages',
  templateUrl: './carouselimages.component.html',
  styleUrls: ['./carouselimages.component.css']
})
export class CarouselimagesComponent implements OnInit {
  images=["../assets/Images/background_img.jpg","../assets/Images/residency-chief-advice.jpg" ,"../assets/Images/medicine.jpg"];
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
