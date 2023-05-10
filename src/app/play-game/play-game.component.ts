import { Component } from '@angular/core';
import { QuestionServiceService } from '../services/question-service.service';
import { reponServive } from '../models/reponService';
import { question } from '../models/question';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
// import { CountdownModule, CountdownComponent } from 'ngx-countdown';
import { ViewChild } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss'],
})
export class PlayGameComponent {
  /**
   *
   */
  // @ViewChild(CountdownComponent) private countdown: CountdownComponent;
  @ViewChild('myCountdown') private countdown!: CountdownComponent;
  data = new reponServive();
  ques = new question(); // lấy câu hỏi từ index radom
  randomIndex: number = 0; // random index câu hỏi
  score = 0; // điểm thi
  constructor(
    private questionService: QuestionServiceService,
    private router: Router,
    private dataService: DataServiceService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((questions) => {
      if (questions) {
        this.data = questions;
        this.randomIndex = Math.floor(Math.random() * this.data.data.length);
        this.ques = this.data.data[this.randomIndex];
      }
    });
  }

  resetCountdown() {
    this.countdown.stop();
    setTimeout(()=>{this.countdown.restart();},1000);
    
  }
  //bắt sự kiện khi countdown đếm ngược tới 0
  handleCountdownEvent(event: CountdownEvent) {
    if (event.action === 'done') {
      this.dataService.setScore(this.score);
      this.router.navigate(['/score']);
    }
  }

  handleAnswer(answer: any): void {
    setTimeout(() => {
      if (answer == this.ques.correctAnswer) {
        this.score++;
        this.data.data.splice(this.randomIndex, 1);
        if (this.data.data.length == 0) {
          this.dataService.setScore(this.score);
          this.router.navigate(['/score']);
        }
        this.randomIndex = Math.floor(Math.random() * this.data.data.length);
        this.ques = this.data.data[this.randomIndex];
      } else {
        this.dataService.setScore(this.score);
        this.dataService.setName(this.getName());
        this.router.navigate(['/score']);
      }
    }, 1000);
  }

  getName() {
    const token = localStorage.getItem('accoutLogin');
    const expireTime = localStorage.getItem('expireTime');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      if (expireTime && new Date().getTime() < parseInt(expireTime)) {
        
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken['NameDisplay'];
      }
      return '';
    } else {
      return '';
    }
  }
}
