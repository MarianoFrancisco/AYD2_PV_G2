import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSistemComponent } from './admin-sistem.component';

describe('AdminSistemComponent', () => {
  let component: AdminSistemComponent;
  let fixture: ComponentFixture<AdminSistemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSistemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSistemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
