import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostdialogueComponent } from '../postdialogue/postdialogue.component';
import { ImageviewerComponent } from '../imageviewer/imageviewer.component';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { NewsData} from './newsfeed';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { map } from 'rxjs';
import { Lightbox } from '@ngx-gallery/lightbox';
@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
  
})

export class NewsfeedComponent implements OnInit,DateAgoPipe
{
  images!: string;
  name!:string;
  userObject: any;
  global!:any;
  showFlag: any = false;
  // currentIndex: any = -1;
  post:any;
  // image:any;
  news! :NewsData;
  base:any = {};
  items!:GalleryItem[];
  sundar:any;


  constructor(private router: Router, private http: HttpClient, public dialogue:MatDialog,public gallery: Gallery, public lightbox: Lightbox ) { }
  
  transform(_value: Date, []: Iterable<any>): string {
    throw new Error('Method not implemented.');
  }
 
  ngOnInit(): void {
    const users = JSON.parse(localStorage.getItem('data') || '{}')
    this.userObject = users.id
     
    this.http.get<any>("http://localhost:3000/register/".concat(this.userObject))
      .subscribe(response => {
        this.images = response.profile;
        this.name=response.user
        
      })
      this.http.get<NewsData>("http://localhost:3000/post?_sort=id&_order=desc")
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

     this.items=arr.map((item:any)=>  new ImageItem({src:item.src,thumb:item.thumb}))
      //  item.id = item.id.toString();        
       this.base[item.id]=this.items
       this.withCustomGalleryConfig(item.id,this.items);
      }
      console.log(this.base)
    });
  } 
  withCustomGalleryConfig(id:any,item:any){
    console.log(id)
    console.log(item)
    const lightboxGalleryRef=this.gallery.ref(id);
    
    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    lightboxGalleryRef.load(item);
  

  }
       
       
    //   this.items= image.map((item: any)=>
    //   new ImageItem({ src: item.post,thumb: item.id})
    // );console.log(this.items)
    
      // console.log(image)
        // this.items= image.post.map((item: any)=>{
          // console.log(this.items)
          // return new ImageItem(item.image);
        // })
     
   
  postImage(){
    this.dialogue.open(ImageviewerComponent,{
      height:'100%',
      width:'100%'
    })
  }
  // getImage(item:any){
  //   const arr: Array<object> = []
  //   if(item.post.length > 0){      
  //     for (let image of item.post) {
  //       arr.push({
  //         image: image,
  //         thumbImage: image,
  //       });
  //     } this.base=arr
  //     console.log(this.base)
     
  //   }
  //   return arr
    
    
  // }
  
  opendashboard(){
    this.router.navigate(["dashboard"])
  }
  toggle(nav:any){
    if(nav.opened){
      nav.close();
    }else{
      nav.open();
    }

  }
  newPost(){
    this.dialogue.open(PostdialogueComponent,{
      height:'auto',
      width:"auto",
      
    })
  }
  logout() {
    
    this.router.navigate([""]);
  }
  showLightbox(_index:any) {   
    this.showFlag = true;
    // this.currentIndex = index;
  }

  closeEventHandler() {
    this.showFlag = false;
    // this.currentIndex = -1;

  }
  
 



}

  // console.log(this.global)
//       const arr = [];
// for (let item of this.global) 
// {    
//   // return [    
//   arr.push({
//     image: item.post,
//     thumbImage:item.post,  
  
//   });
//   console.log(arr)
// }
      
        // for(let i=0;i< this.base.length;i++){
          // this.base[i].post=[{image:this.base[i].post[0]}]
         
          // console.log(this.base[i].post)
          
          
      //                ([{image:this.base[i].post[0],
      //                thumbImage:this.base[i].post[0]}])
          
    //  }

      //  for(let i=0;i< this.base.length;i++){
      //  this.base[i].post=[{image:this.base[i].post[0]}]
      //  console.log(this.base[i].post)
      //  }
      
      // console.log(this.global)
      // const arr="";
      // for(let item of this.global){
        // arr.push({

        // })
      // }
      // var str=this.global.toString()
      // console.log(str)
    
  
// const arr = [];
// for (let item of this.global) 
// {        
  // arr.push({
    // image: item.post,
//     thumbImage:item.post,
//     title:"Image"
    
  // });
  // console.log(item.post)
  // console.log(arr)
  // console.log(this.imageObjects)
  // this.post=item.post
  // console.log(this.post)
  // this.imageObject= item.post
  // this.image=item.post
//  console.log(this.imageObject)
 
// }

      
      // console.log(this.global)
      // for(let i in this.global.post)
      // {
      //   const x=this.global.post[i];
      //   console.log(x)
      // }
      // this.global.patchValue({
      //   quotes:this.global.quotes,
        
      //   post:this.global.post,
      //   time:this.global.time,
      // })
      // console.log(this.global.post)
    
      
      

  
  // })
 


// imgValue(val:any){
    
  // for(let i=0;i< this.base.length;i++){
    // this.base[i].post=[{image:this.base[i].post[0]}]
//    
    // console.log(this.base[i].post)
//   }
// }
// imgValue(imager:any){
  // const arr = [];
//  for(let i=0;i<imager;i++){
  //  console.log(i)
  // arr.push({
    // image: imager.post,
    // thumbImage:imager.post, 
  // });
  // console.log(arr)
//  }
  
// }




