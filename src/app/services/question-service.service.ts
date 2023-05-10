import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reponServive } from '../models/reponService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { addQuestionModels, question } from '../models/question';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsAdmin = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accoutLogin')
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:5164/api/Question/";
  public getQuestions(): Observable<reponServive> {
    return this.http.get<reponServive>(this.url+'GetList', httpOptions).pipe(
      
    );
  }
  public addQuestion(addQuestion: addQuestionModels): Observable<reponServive> {
    return this.http.post<reponServive>(this.url+'AddQuestion',addQuestion,httpOptionsAdmin).pipe(
      
    );
  }
  public updateQuestion(updateQuestion: question): Observable<reponServive> {
    return this.http.put<reponServive>(this.url+'Update', updateQuestion, httpOptionsAdmin).pipe(

    );
  }
  public deleteQuestion(id : number): Observable<reponServive>{
    // const idString = id.toString();
    // const url = `${this.http}/Delete/${idString}`;
    return this.http.delete<reponServive>(this.url+'Delete/'+id,httpOptionsAdmin).pipe(
      
    );
  }
}
