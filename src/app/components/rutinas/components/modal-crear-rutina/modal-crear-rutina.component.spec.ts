import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearRutinaComponent } from './modal-crear-rutina.component';

describe('ModalCrearRutinaComponent', () => {
  let component: ModalCrearRutinaComponent;
  let fixture: ComponentFixture<ModalCrearRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCrearRutinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCrearRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
