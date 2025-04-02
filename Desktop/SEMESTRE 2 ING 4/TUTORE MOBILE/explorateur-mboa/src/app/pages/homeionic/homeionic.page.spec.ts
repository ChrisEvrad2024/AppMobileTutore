import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeionicPage } from './homeionic.page';

describe('HomeionicPage', () => {
  let component: HomeionicPage;
  let fixture: ComponentFixture<HomeionicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeionicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
