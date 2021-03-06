import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostdialogueComponent } from '../postdialogue/postdialogue.component';
import { ImageviewerComponent } from '../imageviewer/imageviewer.component';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { NewsData} from './newsfeed';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { map, Observable, startWith, Subscription,debounceTime, distinctUntilChanged, switchMap, } from 'rxjs';
import { Lightbox } from '@ngx-gallery/lightbox';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { UserprofileComponent} from '../userprofile/userprofile.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'], 
})

export class NewsfeedComponent implements OnInit,DateAgoPipe
{
  images!: string;
  name!:string;
  userObject: any;
  global!:any;
  showFlag: any = false;
  post:any;
  news! :NewsData;
  base:any = {};
  names:any;
  items!:GalleryItem[];
  public subs = new Subscription();
  options:any;
  filteredOptions: any;
  jsonControl = new FormControl();
  num:any;
  senderid:any;
  receiver:any;
  receiverid:any;
  showElement: boolean = true;
  registerValue:any;
  finalValue:any;
  output:any;
  value:any;
  obj:any;
  accept:any;


  constructor(private router: Router, 
    private http: HttpClient,
     private  service: MyserviceService,
     public dialogue:MatDialog,
     public gallery: Gallery,
      public lightbox: Lightbox,
      private route: ActivatedRoute ) { 
    //Autocomplete
    this.filteredOptions = this.jsonControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filter(value || ''))    
    
    ); 
  }
  
  transform(_value: Date, []: Iterable<any>): string {
    throw new Error('Method not implemented.');
  }

 
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      // console.log(params)
      this.receiverid = params.data;
    }); 
    const users = JSON.parse(localStorage.getItem('data') || '{}')
    this.userObject = users.id
    console.log(this.userObject)
    this.http.get<any>("http://localhost:3000/register/".concat(this.userObject))
      .subscribe(response => {
        this.images = response.profile;
        this.name=response.user;      
      })

      // friend request 
      this.http.get<any>("http://localhost:3000/friend?receiver="+this.userObject).subscribe(response=>{
        this.receiver=response
        console.log(this.receiver)
        this.obj = this.receiver.map(function(val:any){
          return val.sender;
         
        })
        console.log(this.obj)
        this.http.get<any>("http://localhost:3000/register").subscribe(response=>{
          this.value=response
          this.finalValue=this.value.filter((x:any)=>this.obj.includes(x.id));
          // this.finalValue=this.value.filter((receiverValues:any)=>receiverValues.id==this.obj.indexOf(1))   
            console.log(this.finalValue)  
            
        })
         
      })    
            
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

     this.items=arr.map((item:any)=>  new ImageItem({src:item.src,thumb:item.thumb}))
      //  item.id = item.id.toString();        
       this.base[item.id]=this.items
       this.withCustomGalleryConfig(item.id,this.items);
      }
    
    });

   
 
  } 
   // Autocomplete 
   autoComplete(value:any){
    this.num=value
    this.router.navigate(["userprofile"], {queryParams :{data:this.num}})
    console.log(this.num)
  }
  private _filter(value: string): Observable<any[]>{
    return this.service.getStates()
    .pipe(
      map(response => response.filter((option:any) => { 
        return option.user.toLowerCase().indexOf(value.toLowerCase()) === 0
      }))) 
  }

 //Gallery

  withCustomGalleryConfig(id:any,item:any){
    const lightboxGalleryRef=this.gallery.ref(id);
    
    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    lightboxGalleryRef.load(item);
  
  }
       
//AutoComplete onclick

     
   
  postImage(){
    this.dialogue.open(ImageviewerComponent,{
      height:'100%',
      width:'100%'
    })
  }

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
  
  }

  closeEventHandler() {
    this.showFlag = false;

  }
  
  friendrequest(){
    this.router.navigate(["request"])
  }
  requestconform(element:any, text:any){
    let acc=this.obj
    console.log(acc)
    element.textContent = text;
    this.accept =text
    console.log(this.accept)
    
    // this.router.navigate(["userprofile"], {queryParams :{values:this.accept}})
   
  }
  Deleterequest(){
   
  }
 



}

 