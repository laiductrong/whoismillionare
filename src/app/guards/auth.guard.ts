import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}
  isAdmin = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('accoutLogin');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role =
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
      if (role === 'Admin') {
        this.isAdmin = true;
        // cho phép truy cập vào trang có phần quyền admin
        return true;
      } else {
        // không có phần quyền admin, không cho truy cập vào trang
        console.log(decodedToken.role);

        this.router.navigate(['/not-found']);
        return false;
      }
    } else {
      // không có token hoặc token hết hạn, chuyển hướng đến trang đăng nhập
      this.router.navigate(['/login']);
      return false;
    }
  }
}
