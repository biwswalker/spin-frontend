import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjInfoSummaryComponent } from './prj-info-summary.component';

describe('PrjInfoSummaryComponent', () => {
  let component: PrjInfoSummaryComponent;
  let fixture: ComponentFixture<PrjInfoSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjInfoSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjInfoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
