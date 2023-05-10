import { Component } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-high-score',
  templateUrl: './high-score.component.html',
  styleUrls: ['./high-score.component.scss'],
})
export class HighScoreComponent {
  /**
   *
   */
  constructor(private data: DataServiceService) {
    this.name = data.getName();
    this.score = data.getScore();
    this.checkLogin();
  }
  name = '';
  score = 0;
  isLogin = false;
  checkLogin() {
    const accoutLogin = localStorage.getItem('accoutLogin');
    const expireTime = localStorage.getItem('expireTime');
    if (
      accoutLogin &&
      expireTime &&
      new Date().getTime() < parseInt(expireTime)
    ) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
  // Khai báo mảng dữ liệu bao gồm 3 người
  highScores = [
    { name: 'John', score: 100 },
    { name: 'Jane', score: 95 },
    { name: 'Michael', score: 90 },
    { name: 'Sarah', score: 85 },
    { name: 'David', score: 80 },
    { name: 'Emily', score: 75 },
    { name: 'Tom', score: 70 },
    { name: 'Olivia', score: 65 },
    { name: 'Luke', score: 60 },
    { name: 'Grace', score: 55 },
  ];
}
