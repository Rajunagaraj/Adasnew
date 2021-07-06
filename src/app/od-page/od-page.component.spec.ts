import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ODPageComponent } from './od-page.component';

describe('ODPageComponent', () => {
  let component: ODPageComponent;
  let fixture: ComponentFixture<ODPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ODPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ODPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
