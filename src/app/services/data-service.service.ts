import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  constructor() { }
  private score : number = 0;
  private name : string = '';
  setScore(score : number){
    this.score = score;
  }
  getScore(): number {
    return this.score;
  }
  setName(name: string){
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
}
