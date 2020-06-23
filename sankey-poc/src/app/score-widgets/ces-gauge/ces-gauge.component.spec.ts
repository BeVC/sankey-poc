import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CesGaugeComponent } from './ces-gauge.component';

describe('CesGaugeComponent', () => {
  let component: CesGaugeComponent;
  let fixture: ComponentFixture<CesGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CesGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CesGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
