import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../services/api.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private route: Router, private api: ApiService) { }
  ngOnInit() {
  }
  Login_Submit(username, password): void {
    let userdetails =
      { "firstName": username, "password": password }
    // if(Object.keys(this.user).length !== 0){
    this.api.login(userdetails).subscribe((data: any) => {
      if (data == "Login Succesfull") {
        localStorage.setItem('users', JSON.stringify(userdetails['firstName']));
        this.api.Login_user(JSON.parse(localStorage.getItem('users')))
        this.route.navigate(['/Project_list']);
       
      }
    }, (error) => {

    })
    //}
  }

}
