import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../../services/api.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private api: ApiService,private route:Router) {}
  ngOnInit() {
    this.Get_login_details();
  }
  current_user:any;
  Get_login_details():void {
    this.api.Currentuser.subscribe((results) => {
      this.current_user = results;
      console.log(this.current_user,"##")
    });
  }
  Logout(){
    localStorage.clear();
    this.route.navigate(['/Login']);
  }
}
