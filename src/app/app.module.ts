import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { HighScoreComponent } from './high-score/high-score.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { WebFooterComponent } from './web-footer/web-footer.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { CountdownModule } from 'ngx-countdown';
import { AccountComponent } from './account/account.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ScoreOfPlayerComponent } from './score-of-player/score-of-player.component';
import { ManageQuestionComponent } from './manage-question/manage-question.component';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from "@auth0/angular-jwt";
import { NotFoundComponent } from './not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { FormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';



const appRoutes: Routes = [
  { path: '', component: HomeMenuComponent },
  { path: 'highScore', component: HighScoreComponent },
  { path: 'playGame', component: PlayGameComponent },
  { path: 'account', component: AccountComponent},
  { path: 'score' , component: ScoreOfPlayerComponent},
  { path: 'manage-question', component: ManageQuestionComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: NotFoundComponent},
  { path: 'manage-account', component: ManageAccountComponent, canActivate: [AuthGuard] }
];
@NgModule({
  declarations: [
    AppComponent,
    PlayGameComponent,
    HighScoreComponent,
    WebFooterComponent,
    HomeMenuComponent,
    AccountComponent,
    ScoreOfPlayerComponent,
    ManageQuestionComponent,
    NotFoundComponent,
    ManageAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    CountdownModule,
    //hỗ trợ cấu hình giao diện
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('accoutLogin');
        },
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: []
      }
    }),
     FontAwesomeModule,
     MatTableModule,
     FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
