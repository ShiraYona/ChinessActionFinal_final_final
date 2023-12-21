import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorEditComponent } from './donor-edit.component';

describe('DonorEditComponent', () => {
  let component: DonorEditComponent;
  let fixture: ComponentFixture<DonorEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorEditComponent]
    });
    fixture = TestBed.createComponent(DonorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
