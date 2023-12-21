import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftEditComponent } from './gift-edit.component';

describe('GiftEditComponent', () => {
  let component: GiftEditComponent;
  let fixture: ComponentFixture<GiftEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GiftEditComponent]
    });
    fixture = TestBed.createComponent(GiftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
