import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {

  }
 canActivate() {
const role=localStorage.getItem('data');
if(role!==null)
  this.router.navigate(['newsfeed'])
   return true;
 }
 
}
