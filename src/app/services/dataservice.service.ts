import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable, throwError,of } from 'rxjs';
import { catchError, groupBy } from 'rxjs/operators';
import { delay, map } from 'rxjs/operators';
export interface Project_list {
    id: number;
    // isActive: boolean;
    p_name: string; 
}
// Inject Data from Rails app to Angular app
@Injectable({
    providedIn: 'root'
  })
export class DataService{
  // Subscribe data
  private projectId = new BehaviorSubject(null);
  public projectIdId$ = this.projectId.asObservable();
  setId(projectId) {
    this.projectId.next(projectId)
  }
  constructor(private http: HttpClient) { }
  getPeople(term: string = null): Observable<Project_list[]> {
      let items = getMockProject();
      if (term) {
          items = items.filter(x => x.p_name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
      }
      return of(items).pipe(delay(500));
  }
}
function getMockProject() {
    return  [
        { id: 1, p_name: 'BMW' },
        { id: 2, p_name: 'Veoneer' },
        { id: 3, p_name: 'Conti' },
       
    ];
}