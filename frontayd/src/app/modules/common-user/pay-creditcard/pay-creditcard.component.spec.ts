import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCreditcardComponent } from './pay-creditcard.component';

describe('PayCreditcardComponent', () => {
  let component: PayCreditcardComponent;
  let fixture: ComponentFixture<PayCreditcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayCreditcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayCreditcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
