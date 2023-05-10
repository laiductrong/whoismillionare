import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent {
  /**
   *
   */
  constructor(private jwtHelper: JwtHelperService) {
    
    
  }

  isAdmin = false;
  ngOnInit(): void {
    const token = localStorage.getItem('accoutLogin');
    const expireTime = localStorage.getItem('expireTime');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      if (expireTime && new Date().getTime() < parseInt(expireTime)) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        const role =
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
        if(role == 'Admin'){
          this.isAdmin = true;
        }
      }
    } else {
      this.isAdmin = false;
    }
  }

}
