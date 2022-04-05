import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginData } from './login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,LoginData {

user!:LoginData;

  constructor(private http: HttpClient,
    private router: Router,
  ) { }
  formdata = new FormGroup({
    emailid: new FormControl('', Validators.required),
    passwd: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }
  onSubmit() {

    this.http.get<any>('http://localhost:3000/register')
      .subscribe(response => {

        const user = response.find((a: any) => {

          return a.emailid === this.formdata.value.emailid && a.passwd === this.formdata.value.passwd
        });


        if (user) {
          var myObj = { id: user.id, emailid: user.emailid, fname: user.fname }
          localStorage.setItem('data', JSON.stringify(myObj))
          this.formdata.reset();
          this.router.navigate(['newsfeed'])

        } else {

        }

      });


  }

}







