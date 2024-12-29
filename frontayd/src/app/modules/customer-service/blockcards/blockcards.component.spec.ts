import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockcardsComponent } from './blockcards.component';

describe('BlockcardsComponent', () => {
  let component: BlockcardsComponent;
  let fixture: ComponentFixture<BlockcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockcardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
