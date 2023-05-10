import { Component } from '@angular/core';
import { AccountServiceService } from '../services/account-service.service';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  /**
   *
   */
  constructor(
    private accountService: AccountServiceService,
    private router: Router,
    private jwtHelper: JwtHelperService
    // private dataService : DataServiceService
  ) {
    this.getName();
  }

  nameUser = '';
  isLoggedIn = false;
  getName() {
    const token = localStorage.getItem('accoutLogin');
    const expireTime = localStorage.getItem('expireTime');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      if (expireTime && new Date().getTime() < parseInt(expireTime)) {
        this.isLoggedIn = true;
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.nameUser = decodedToken['NameDisplay'];
      }
    } else {
      this.isLoggedIn = false;
    }
  }
  //icon
  faUser = faUser;
  //

  notification = '';
  type = 'warning';
  isNotifi = false;

  close() {
    this.isNotifi = false;
  }

  login(email: string, pass: string) {
    this.accountService.Login(email, pass).subscribe((acc) => {
      if (acc.success) {
        localStorage.removeItem('accoutLogin');
        const expireTime = new Date().getTime() + 3600 * 1000; // Thời gian hết hạn sau 1 giờ
        localStorage.setItem('accoutLogin', acc.data);
        localStorage.setItem('expireTime', expireTime.toString());
        this.router.navigate(['/']);
      } else {
        this.notification = 'Vui lòng kiểm tra lại tài khoản';
        this.isNotifi = true;
      }
    });
  }
  Register(
    email: string,
    username: string,
    password: string,
    repassword: string
  ) {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!emailRegex.test(email)){
      this.notification = 'Email không hợp lệ';
      this.isNotifi = true;
    }
    else if (password != repassword) {
      this.notification = 'Mật khẩu không khớp';
      this.isNotifi = true;
    } else {
      this.accountService
        .RegisterUser(email, username, password)
        .subscribe((acc) => {
          if (acc.success) {
            this.notification = 'Đăng ký thành công';
            // this.dataService.setName(username);
            this.isNotifi = true;
          } else {
            this.notification = 'Đăng ký thất bại';
            this.isNotifi = true;
          }
        });
    }
  }
  Logout() {
    localStorage.removeItem('accoutLogin');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/account']);
    });
  }

  goBack(){
    this.router.navigate(['/']);
  }


}
