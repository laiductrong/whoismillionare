import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, NavigationExtras } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { QuestionServiceService } from '../services/question-service.service';
import { reponServive } from '../models/reponService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addQuestionModels, question } from '../models/question';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.scss'],
})
export class ManageQuestionComponent {
  constructor(
    private questionService: QuestionServiceService,
    private router: Router,
    // private dataService: DataServiceService,
    private modalService: NgbModal
  ) {}
  //save questions from service
  data = new reponServive();
  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((questions) => {
      if (questions) {
        this.data = questions;
      }
    });
  }
  //

  //question need edit or add
  questionEdit!: question;
  //open model edit
  openVerticallyCentered(content: any, ques: question) {
    this.isAddQuestion = false;
    this.questionEdit = ques;
    //mở chi tiết
    this.modalService.open(content, { centered: true });
  }
  //confirm edit
  changeQuestion(
    nameQuestion: string,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string
  ) {
    this.questionEdit.ques = nameQuestion;
    this.questionEdit.answerA = answerA;
    this.questionEdit.answerB = answerB;
    this.questionEdit.answerC = answerC;
    this.questionEdit.answerD = answerD;
    this.questionService
      .updateQuestion(this.questionEdit)
      .subscribe((repon) => {
        if (repon.success) {
          // this.reloadData();
          this.data = repon;
        }
      });
  }

  //function set correct answer = A, B, C or D
  chose(correct: string) {
    this.questionEdit.correctAnswer = correct;
  }

  //value check model is add question or edit question
  isAddQuestion = false;
  //open model add question
  openVerticallyCentered2(content: any) {
    this.isAddQuestion = true;
    //để rỗng các ô input
    this.questionEdit = new question();
    this.modalService.open(content, { centered: true });
  }

  //confirm add question
  addQuestion(
    nameQuestion: string,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string
  ) {
    const newQuestion = new addQuestionModels();
    newQuestion.ques = nameQuestion;
    newQuestion.answerA = answerA;
    newQuestion.answerB = answerB;
    newQuestion.answerC = answerC;
    newQuestion.answerD = answerD;
    newQuestion.correctAnswer = this.questionEdit.correctAnswer;

    this.questionService.addQuestion(newQuestion).subscribe((repon) => {
      if (repon.success) {
        // this.data = repon.data;
        // this.reloadData();
        this.data = repon;
      }
    });
  }

  //open model delete
  openScrollableContent(longContent: any, ques: question) {
    this.questionEdit = ques;
    this.modalService.open(longContent, { scrollable: true });
  }
  //confirm delete
  deleteQuestion() {
    if (this.questionEdit.id) {
      this.questionService
        .deleteQuestion(this.questionEdit.id)
        .subscribe((repon) => {
          if (repon.success) {
            // this.reloadData();
            this.data = repon;
          }
        });
    }
  }

  //reload data
  reloadData() {
    this.questionService.getQuestions().subscribe((questions) => {
      if (questions.success) {
        this.data = questions;
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
