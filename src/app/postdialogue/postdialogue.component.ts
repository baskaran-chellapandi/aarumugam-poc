import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-postdialogue',
  templateUrl: './postdialogue.component.html',
  styleUrls: ['./postdialogue.component.css']
})

export class PostdialogueComponent implements OnInit {
  image!: string;
  userObject: any;
  base!: any;
  currentDate: any;
  post:any;
  urls: any = [];
  images:any;
  messageSuccess:any;
  constructor(private http: HttpClient, private router: Router) { }
  formValue = new FormGroup({
    quotes: new FormControl(''),
    post: new FormControl(''),
    time: new FormControl(new Date())
  });
  onImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
          this.formValue.patchValue({
            post: this.urls
          })
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }

  }
  ngOnInit(): void {
    const users = JSON.parse(localStorage.getItem('data') || '{}')
    this.userObject = users.id
    this.http.get<any>("http://localhost:3000/register/".concat(this.userObject))
      .subscribe(response => {
        this.image = response.profile;  
      })
  }

  postData() {

    const baseValue = this.formValue.value
    this.http.post('http://localhost:3000/post', baseValue)
      .subscribe(response => {
       
      });
      
      this.router.navigate(['newsfeed'])  
  }


  message = '';
  showEmojiPicker = false;

  toggleEmojiPicker() {
    // console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    const { message } = this;
    const text = `${message}${event.emoji.native}`;
    this.message = text;

  }
  refresh() {
    window.location.reload();
    this.messageSuccess = true;

setTimeout(()=>{                          
    this.messageSuccess = false;
}, 5000);

}

}

  