import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(): boolean {
    var isAuthentificated = true;
    if (!isAuthentificated) {
      // If the user is not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}