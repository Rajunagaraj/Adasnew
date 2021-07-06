import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Project_list {
    id: number;
    // isActive: boolean;
    p_name: string;
  
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) { }

  
   
    getPeople(term: string = null): Observable<Project_list[]> {
        let items = getMockPeople();
        if (term) {
            items = items.filter(x => x.p_name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }
}

function getMockPeople() {
    return  [
        { id: 1, p_name: 'BMW' },
        { id: 2, p_name: 'Veoneer' },
        { id: 3, p_name: 'Conti' },
       
    ];
}
