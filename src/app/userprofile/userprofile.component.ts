import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewData } from './userprofile';
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
  global: any;
  base: any;
  id: any;
  idNum: any;
  userObject: any;
  username: any;
  postvalue: any;
  showElement: boolean = true;
  uservalue: any;
  texts:any;
  types:any;
  public text: string = 'Add Friend';
  activatedRoute: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

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
    this.route.queryParams.subscribe((params: any) => {
      // console.log(params)
      this.id = params.data;
    }); console.log(this.id)
  

    this.http.get<any>("http://localhost:3000/post?_sort=id&_order=desc")
      .subscribe(response => {
        this.global = response
        for (let item of this.global) {
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
    this.http.get<any>('http://localhost:3000/register/'.concat(this.id)).subscribe(response => {
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
  changeText(element:any, text:any){
    element.textContent = text;
    element.disabled = true;
    this.texts ={type1:text}
    console.log(this.texts)
  }

  // friend request sender
  addFriend() {
    // if(this.text === 'Add Friend') { 
    //       this.text = 'Request send'
    //     } else {
    //       this.text = 'Friends'
    //     }
    const users = JSON.parse(localStorage.getItem('data') || '{}')
    this.userObject = users.id
    this.http.get<any>("http://localhost:3000/register/".concat(this.userObject))
      .subscribe(response => {
        this.username = response.id 
        console.log(this.username)

      });
    // friend request receiver
    this.http.get<any>('http://localhost:3000/register/'.concat(this.id)).subscribe(response => {
      this.uservalue = response.id 
      console.log(this.uservalue)
      this.router.navigate(["newsfeed"], {queryParams :{data:this.uservalue}})
      console.log(this.uservalue)
    })
    setTimeout(() => {
      // this.route.queryParams.subscribe((params: any) => {
      //   this.types = params.values;
      // }); console.log(this.types)
      var value = { receiver: this.uservalue, sender: this.username,type1:this.texts,type2:this.types};
      this.http.post('http://localhost:3000/friend', value).subscribe(response => {
        this.postvalue = response
        console.log(this.postvalue)
      })
      this.showElement = false;
    }, 2000);

  }
 


}
