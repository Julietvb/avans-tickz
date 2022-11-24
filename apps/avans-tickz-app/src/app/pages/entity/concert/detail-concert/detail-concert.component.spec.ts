import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailConcertComponent } from './detail-concert.component';

describe('DetailConcertComponent', () => {
  let component: DetailConcertComponent;
  let fixture: ComponentFixture<DetailConcertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailConcertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailConcertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
