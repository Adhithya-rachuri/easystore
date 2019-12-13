import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { RestResourcesService } from '../services/rest-resources.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {
  @ViewChild('mySidebar') mySidebar:ElementRef;
  user = {
    firstName: '',
    lastName :''
  }
  isSidebarOpen = true;
  constructor(private restService:RestResourcesService, private route:Router) { }

  ngOnInit() {
    this.user.firstName = sessionStorage.getItem('userFname');
    this.user.lastName = sessionStorage.getItem('userLname');
    console.log(this.user.firstName);
  }


  openNav(){
    this.isSidebarOpen = true;
    this.mySidebar.nativeElement.setAttribute("style", "width:200px; marginLeft:200px;");
  }

  closeNav(){
    this.isSidebarOpen = false;
    this.mySidebar.nativeElement.setAttribute("style", "width:0px; marginLeft:0px;");
  }

  onLogout(){
    sessionStorage.setItem("userFname", '');
    sessionStorage.setItem("userLname", '');
    this.route.navigate(['/auth']);
  }
}
