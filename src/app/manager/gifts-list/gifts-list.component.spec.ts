import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftsListComponent } from './gifts-list.component';

describe('GiftsListComponent', () => {
  let component: GiftsListComponent;
  let fixture: ComponentFixture<GiftsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GiftsListComponent]
    });
    fixture = TestBed.createComponent(GiftsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
