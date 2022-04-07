import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  userValue:any;
  constructor(private http: HttpClient,
    private router: Router
  ) { }
 
  
  base:any;

    formdata = new FormGroup({
    user:new FormControl('',Validators.required), 
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    emailid: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    passwd: new FormControl('', Validators.required),
    add:new FormControl('',Validators.required),
    cpasswd: new FormControl('', Validators.required),
    city:new FormControl('',Validators.required),
    state:new FormControl('',Validators.required),
    zip:new FormControl('',Validators.required),
    descrip:new FormControl('',Validators.required),
    profile:new FormControl('')
  },
  // {
  //   validator: ConfirmPasswordValidator("passwd", "cpasswd")
  // }
  );
    onFileSelected(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.base= reader.result;
      // console.log(this.base)
       this.formdata.patchValue({
        profile:this.base
     })
     
   };

  }     
 
  onCreate() {
    
    const data = this.formdata.value;
    this.http.post('http://localhost:3000/register', data)

    .subscribe(response => {
      this.formdata.reset();
      this.router.navigate(['']);
    });
  }


  ngOnInit(): void {
  
  }
  ParentComponent(data:any){
      console.log(data)
      this.formdata.patchValue({
               user:data.lastName,
              fname:data.firstName,
              lname:data.lastName,
              emailid:data.email,
              profile:data.photoUrl,
        
      })
  }

 

}
