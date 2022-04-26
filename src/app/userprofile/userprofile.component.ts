import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewData} from './userprofile';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
data!: NewData;
global:any;
base:any;
id:any;
idNum:any;
userObject:any;
datas:any;
postvalue:any;
  constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router) { }

  // @Input() item=0;
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
    this.route.queryParams.subscribe((params:any) => {
      // console.log(params)
      this.id = params.data;
    });console.log(this.id)

    this.http.get<any>("http://localhost:3000/post?_sort=id&_order=desc")
    .subscribe(response =>{
    this.global=response
    for(let item of this.global){
      const arr: Array<object> = []
      for (let image of item.post) {     
        arr.push({
                  src: image,
                  thumb: image,
                });
      }
    }
  });
  // console.log(this.id)
    this.http.get<any>('http://localhost:3000/register/'.concat(this.id)).subscribe(response=>{
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
     
    })
  }
  addFriend(){
    const users = JSON.parse(localStorage.getItem('data') || '{}')
    this.userObject = users.id

    this.http.get<any>("http://localhost:3000/register/".concat(this.userObject))
      .subscribe(response => {
      this.datas=response
      console.log(this.datas)
      this.http.post('http://localhost:3000/friend',this.datas).subscribe(response=>{
       this.postvalue=response
      })
    });
  }

}
