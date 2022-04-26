import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { ProfileComponent } from './profile/profile.component';
// import { UserprofileComponent} from './userprofile/userprofile.component'
import { UserprofileComponent} from './userprofile/userprofile.component'
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  { path:"",component:LoginComponent,canActivate:[RoleGuard]},
  { path:"register",component:RegisterComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"newsfeed",component:NewsfeedComponent,canActivate:[AuthGuard]},
  {path:"profile",component:ProfileComponent},
  {path:"userprofile",component:UserprofileComponent},
  {path:"request",component:RequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
