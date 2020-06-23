import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsatGaugeComponent } from './csat-gauge.component';

describe('CsatGaugeComponent', () => {
  let component: CsatGaugeComponent;
  let fixture: ComponentFixture<CsatGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsatGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsatGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
