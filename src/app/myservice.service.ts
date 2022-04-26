import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
value:any;
opts = [];
  constructor(private http: HttpClient) { }
  public getStates(): Observable<any> {
    // return this.opts.length? of(this.opts):
  return this.http.get<any>('http://localhost:3000/register')
  //    .pipe
  //   (tap(data => this.opts = data))
  }
}
