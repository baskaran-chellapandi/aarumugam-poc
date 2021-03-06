import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() ParentComponet:EventEmitter<any> = new EventEmitter()
  constructor(private http: HttpClient,
    private router: Router,private authService: SocialAuthService
  ) { }
  user: SocialUser | undefined;
  loggedIn: boolean | undefined;
  formdata = new FormGroup({
    emailid: new FormControl('', Validators.required),
    passwd: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
    
      this.user = user;
      this.loggedIn = user != null;

      this.http.get<any>('http://localhost:3000/register')
      .subscribe(response => {
        const users = response.find((a: any) => {
        return a.emailid === this.user?.email          
          });
       if(users){
         var myObj = { id: users.id, emailid: users.emailid, fname: users.fname }
         localStorage.setItem('data', JSON.stringify(myObj))
         this.formdata.reset();
         this.router.navigate(['newsfeed'])

     } else {
    
       this.ParentComponet.emit(this.user)
      
     }   
      })
    });
    
  }
  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
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







