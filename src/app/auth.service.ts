import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  NameDisplay = '';
  constructor(
    private authService: AuthService,
    private jwtHelper: JwtHelperService
  ) {
    
  }
  // deCodeToken() {
  //   const token = localStorage.getItem('accoutLogin');
  //   if (token && !this.jwtHelper.isTokenExpired(token)) {
  //     const decodedToken = this.jwtHelper.decodeToken(token);
  //     const role =
  //       decodedToken[
  //         'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
  //       ];
  //     this.NameDisplay = decodedToken['NameDisplay'];
  //     if (role === 'Admin') {
  //       // cho phép truy cập vào trang có phần quyền admin
  //       // return true;
  //     } else {
  //       // không có phần quyền admin, không cho truy cập vào trang
  //       console.log(decodedToken.role);
  //     }
  //   }
  // }
}
