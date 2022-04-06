import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
  // userObject: any;
  // image!: string;
  // name!:string;
  // base: any;
  // currentDate: any;
  // files: File[] = [];
  

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // formValue = new FormGroup({
  //   quotes: new FormControl(''),
  //   post: new FormControl(''),
  // });

  // onImageUpload(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.base = reader.result;
  //     // console.log(this.base)
  //     this.formValue.patchValue({
  //       post: this.base
  //     })

  //   };

  // }
  // // onSelect(event:any) {
  // //   // console.log(event);
  // //   this.files.push(...event.addedFiles);
  // //   const formData = new FormData();
  // //   for (var i = 0; i < this.files.length; i++) { 
  // //    formData.append("file[]", this.files[i]);

  // //   }}
  // //   onRemove(event:any) {
  // //     // console.log(event);
  // //     this.files.splice(this.files.indexOf(event), 1);

  // // }



  // postData() {
    
  //   const baseValue = this.formValue.value
  //   this.http.post('http://localhost:3000/post', baseValue)
  //    .subscribe(response=>{
       

  //    });

  // }

  // ngOnInit(): void {
  //   this.currentDate = new Date();
  //   const users = JSON.parse(localStorage.getItem('data') || '{}')
  //   this.userObject = users.id
  //   // console.log(this.userObject)

  //   this.http.get<any>('http://localhost:3000/register/'.concat(this.userObject))
  //     .subscribe(response => {
  //       this.image = response.profile;
  //       this.name=response.user
  //       console.log(this.name)
  //     })

  // }

  // message = '';
  // showEmojiPicker = false;

  // toggleEmojiPicker() {
  //   // console.log(this.showEmojiPicker);
  //   this.showEmojiPicker = !this.showEmojiPicker;
  // }

  // addEmoji(event: any) {
  //   const { message } = this;
  //   const text = `${message}${event.emoji.native}`;
  //   this.message = text;
  
  // }







}
