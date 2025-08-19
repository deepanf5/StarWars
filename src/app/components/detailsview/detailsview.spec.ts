import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detailsview } from './detailsview';

describe('Detailsview', () => {
  let component: Detailsview;
  let fixture: ComponentFixture<Detailsview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detailsview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Detailsview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
