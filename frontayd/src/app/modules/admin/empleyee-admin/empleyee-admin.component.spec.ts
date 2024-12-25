import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleyeeAdminComponent } from './empleyee-admin.component';

describe('EmpleyeeAdminComponent', () => {
  let component: EmpleyeeAdminComponent;
  let fixture: ComponentFixture<EmpleyeeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleyeeAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleyeeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
