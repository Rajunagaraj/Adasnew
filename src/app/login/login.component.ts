import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../services/api.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any = {};
  constructor(private route:Router,private api:ApiService) { }
  ngOnInit() {
  }
  Login_Submit(username, password):void{
    let userdetails =
    {"firstName": username,"password": password}
    this.route.navigate(['/Project_list']);
    // if(Object.keys(this.user).length !== 0){
      this.api.login(userdetails).subscribe((data: any)=>{
console.log(data, "login")
if(data == "Login Succesfull") {
  this.api.Login_user()
  this.route.navigate(['/Project_list']);
  localStorage.setItem('users',JSON.stringify(userdetails));}
      },(error)=>{

      })

    //}
  }

}
