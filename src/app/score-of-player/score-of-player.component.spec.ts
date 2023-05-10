import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreOfPlayerComponent } from './score-of-player.component';

describe('ScoreOfPlayerComponent', () => {
  let component: ScoreOfPlayerComponent;
  let fixture: ComponentFixture<ScoreOfPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreOfPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreOfPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
