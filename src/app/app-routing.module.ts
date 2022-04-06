import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { DialogueComponent } from './dialogue/dialogue.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path:"",component:LoginComponent,canActivate:[RoleGuard]},
  { path:"register",component:RegisterComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"dialogue",component:DialogueComponent},
  {path:"newsfeed",component:NewsfeedComponent,canActivate:[AuthGuard]},
  {path:"profile",component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
