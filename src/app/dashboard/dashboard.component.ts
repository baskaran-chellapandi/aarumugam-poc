import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashData } from './dashboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data!: DashData;
  userObject: any;

 
  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar,
   public dialogue:MatDialog ) { }

  form = new FormGroup({
    emailid: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    user: new FormControl('', Validators.required),
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    add: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    descrip: new FormControl('', Validators.required)
  });



  ngOnInit(): void {

    const users = JSON.parse(localStorage.getItem('data') || '{}')
    this.userObject = users.id

    this.http.get<DashData>("http://localhost:3000/register/".concat(this.userObject))
      .subscribe(response => {
        this.data = response
        this.form.patchValue({
          user: this.data.user,
          emailid: this.data.emailid,
          fname: this.data.fname,
          lname: this.data.lname,
          add: this.data.add,
          city: this.data.city,
          zip: this.data.zip,
          descrip: this.data.descrip,
          state: this.data.state

        })
      });

  }
  onSubmit(message: string,t=2000) {
    const value = this.form.value
    this.http.patch('http://localhost:3000/register/'.concat(this.userObject), value)
      .subscribe(respon => {

      });
   

    if (value !== null) {
     let simpleSnackBarRef= this.snackBar.open(message)
      setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), t);
    } else {

    }

  }
  openDialog(){
     
      this.router.navigate(['newsfeed'])
  }

  logout() {
    localStorage.removeItem("data");
    this.router.navigate(['']);
  }


}
