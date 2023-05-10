import { Component } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score-of-player',
  templateUrl: './score-of-player.component.html',
  styleUrls: ['./score-of-player.component.scss']
})
export class ScoreOfPlayerComponent {

  /**
   *
   */
  score : number = 0;
  isLogin = false;
  constructor(private router: Router ,private dataService : DataServiceService) {
    this.score = dataService.getScore();
    this.checkLogin();
  }
  saveScore(){
    // const accoutLogin = localStorage.getItem('accoutLogin');
    // const expireTime = localStorage.getItem('expireTime');
    // if (accoutLogin && expireTime && new Date().getTime() < parseInt(expireTime)) {
    //   this.router.navigate(['/highScore']);
    // }
    if(this.isLogin){
      this.router.navigate(['/highScore']);
    }
  }

  checkLogin(){
    const accoutLogin = localStorage.getItem('accoutLogin');
    const expireTime = localStorage.getItem('expireTime');
    if (accoutLogin && expireTime && new Date().getTime() < parseInt(expireTime)) {
      this.isLogin = true;
    }
    else{
      this.isLogin = false;
    }
  }
  login(){
    this.router.navigate(['/account']);
  }
}
