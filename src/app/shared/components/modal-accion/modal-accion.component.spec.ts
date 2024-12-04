import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccionComponent } from './modal-accion.component';

describe('ModalAccionComponent', () => {
  let component: ModalAccionComponent;
  let fixture: ComponentFixture<ModalAccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAccionComponent]
    });
    fixture = TestBed.createComponent(ModalAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
