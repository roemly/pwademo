import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckoutComponent } from './form-checkout.component';

describe('FormCheckoutComponent', () => {
  let component: FormCheckoutComponent;
  let fixture: ComponentFixture<FormCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
