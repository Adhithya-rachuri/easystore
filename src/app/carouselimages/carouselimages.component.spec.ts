import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselimagesComponent } from './carouselimages.component';

describe('CarouselimagesComponent', () => {
  let component: CarouselimagesComponent;
  let fixture: ComponentFixture<CarouselimagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselimagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
