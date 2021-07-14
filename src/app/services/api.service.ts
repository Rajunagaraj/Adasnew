
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, InjectionToken } from '@angular/core';
export const CONNECTION_TYPE = new InjectionToken<string>('ConnectionType');
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) {
   }
   ngOnInit() {
    
  }
  private user = new BehaviorSubject<any>(null);
  Currentuser = this.user.asObservable();

  Login_user(users: object) {
    this.user.next(users);
}


Gettask_list(): Observable<any>{
  return this._http.get("http://localhost:8000/getTaskFilesList");
  }
  
  login(user): Observable<any>{
    return this._http.post("http://127.0.0.1:8000/loginuser/", user);
    }
  GetObjectLevels(): Observable<any>{
      return this._http.get("http://localhost:8000/getObjectlevel");
  }
  GetSceneLevels(): Observable<any>{
    return this._http.get("http://localhost:8000/getScenelevel");
  }
 
  getmarking(project:any): Observable<any>{
    return this._http.post("http://localhost:8000/getScenelevel",project);
  }

}
