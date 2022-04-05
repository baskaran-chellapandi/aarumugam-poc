import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatOption, MatOptionModule, MatOptionSelectionChange } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import{HttpClientModule} from'@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { DialogueComponent } from './dialogue/dialogue.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PickerModule } from '@ctrl/ngx-emoji-mart'
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { PostdialogueComponent } from './postdialogue/postdialogue.component';
import { ProfileComponent } from './profile/profile.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { NgImageSliderModule } from 'ng-image-slider';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from '@ngx-gallery/lightbox';


// @NgModule({
//  imports: [
//     // ...
//     GalleryModule
//  ]
// })
// import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DialogueComponent,
    NewsfeedComponent,
    PostdialogueComponent,
    ProfileComponent,
    DateAgoPipe,
    // TimeAgoPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatSidenavModule,
    NgbModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    PickerModule,
    NgxDropzoneModule,
    NgImageFullscreenViewModule,
    ScrollingModule,
    NgImageSliderModule,
    GalleryModule,
    LightboxModule
    
      
    

  ],
  providers: [AuthGuard,RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
