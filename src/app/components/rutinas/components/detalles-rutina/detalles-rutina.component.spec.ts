import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesRutinaComponent } from './detalles-rutina.component';

describe('DetallesRutinaComponent', () => {
  let component: DetallesRutinaComponent;
  let fixture: ComponentFixture<DetallesRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesRutinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
