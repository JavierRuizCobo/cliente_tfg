import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedRoutineDetailComponent } from './completed-routine-detail.component';

describe('CompletedRoutineDetailComponent', () => {
  let component: CompletedRoutineDetailComponent;
  let fixture: ComponentFixture<CompletedRoutineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedRoutineDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedRoutineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
