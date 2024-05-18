import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarRutinaComponent } from './solicitar-rutina.component';

describe('SolicitarRutinaComponent', () => {
  let component: SolicitarRutinaComponent;
  let fixture: ComponentFixture<SolicitarRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarRutinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitarRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
