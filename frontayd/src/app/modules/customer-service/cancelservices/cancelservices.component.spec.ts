import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelservicesComponent } from './cancelservices.component';

describe('CancelservicesComponent', () => {
  let component: CancelservicesComponent;
  let fixture: ComponentFixture<CancelservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelservicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
