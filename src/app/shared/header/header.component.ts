import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../../services/api.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  current_user:any;
  constructor(private api: ApiService,private route:Router) {}
  ngOnInit() {
    this.Get_login_details();
  }
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
