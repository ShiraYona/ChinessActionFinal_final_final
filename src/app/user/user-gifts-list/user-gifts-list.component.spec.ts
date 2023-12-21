import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGiftsListComponent } from './user-gifts-list.component';

describe('UserGiftsListComponent', () => {
  let component: UserGiftsListComponent;
  let fixture: ComponentFixture<UserGiftsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserGiftsListComponent]
    });
    fixture = TestBed.createComponent(UserGiftsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
