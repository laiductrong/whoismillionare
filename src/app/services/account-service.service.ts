import { Injectable } from '@angular/core';
import { account, loginAccount } from '../models/account';
import { reponServive } from '../models/reponService';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { accountService, accountServiceList } from '../models/accountService';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



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
export class AccountServiceService {

  constructor( private http: HttpClient) { }

  private url = "http://localhost:5164/api/User/";

  public RegisterUser(email: string, username: string ,password: string) : Observable<accountService>{
    let newAccount = new account();
    newAccount.id = 0;
    newAccount.userName =email;
    newAccount.nameDisplay = username;
    newAccount.passwordHash = password;
    return this.http.post<accountService>(this.url+'Register',newAccount, httpOptions).pipe();
  }
  Login(email: string, password: string): Observable<accountService> {
    let newAccount = new loginAccount();
    newAccount.userName = email;
    newAccount.passwordHash = password;
    newAccount.nameDisplay = '';
    return this.http.post<accountService>(this.url+'Login', newAccount, httpOptions);
  }

  public getUser(): Observable<accountServiceList>{
    return this.http.get<accountServiceList>(this.url+'Get',httpOptionsAdmin);
  }

  public deleteUser(id: number): Observable<accountServiceList>{
    return this.http.delete<accountServiceList>(this.url+'Delete/'+id,httpOptionsAdmin)
  }


}
