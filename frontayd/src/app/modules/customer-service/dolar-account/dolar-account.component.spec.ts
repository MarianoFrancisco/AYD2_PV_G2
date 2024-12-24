import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DolarAccountComponent } from './dolar-account.component';

describe('DolarAccountComponent', () => {
  let component: DolarAccountComponent;
  let fixture: ComponentFixture<DolarAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DolarAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DolarAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
