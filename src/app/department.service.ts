import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Departament } from './departament';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly url = 'http://localhost:3000/departament';

  private departmentSubject$: BehaviorSubject<Departament[]> = new BehaviorSubject<Departament[]>(null);

  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Departament[]>{
    if(!this.loaded){
      this.http.get<Departament[]>(this.url)
      .pipe(
        tap((deps)=> console.log(deps)), 
        delay(1000)
      )
      .subscribe(this.departmentSubject$);
      this.loaded = true;
    }
    return this.departmentSubject$.asObservable();
  }

  add(d: Departament): Observable<Departament> {
    return this.http.post<Departament>(this.url, d)
    .pipe(
      tap((dep: Departament)=> this.departmentSubject$.getValue().push(dep))
    )
  }

  del(dep: Departament): Observable<any> {
    return this.http.delete(`${this.url}/${dep._id}`)
    .pipe(
      tap(()=>{
        let departments = this.departmentSubject$.getValue();
        let i = departments.findIndex(d => d._id === dep._id);
        if(i>=0)
          departments.splice(i,1)
      })
    )
  }

  update(dep: Departament): Observable<Departament>{
    return this.http.patch<Departament>(`${this.url}/${dep._id}`, dep)
    .pipe(
      tap((d)=>{
        let departments = this.departmentSubject$.getValue();
        let i = departments.findIndex(d => d._id === dep._id);
        if(i>=0)
        departments[i].name = d.name;
      })
    )
    }

  

}