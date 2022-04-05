import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imageviewer',
  templateUrl: './imageviewer.component.html',
  styleUrls: ['./imageviewer.component.css']
})
export class ImageviewerComponent implements OnInit {
 global:any;
  constructor(private router: Router, private http: HttpClient,) { }

  ngOnInit(): void {
    this.http.get<any>("http://localhost:3000/post?_sort=id&_order=desc")
    .subscribe(response =>{
    this.global=response
    
  }
  )}

}
