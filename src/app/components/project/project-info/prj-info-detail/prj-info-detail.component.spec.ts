import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjInfoDetailComponent } from './prj-info-detail.component';

describe('PrjInfoDetailComponent', () => {
  let component: PrjInfoDetailComponent;
  let fixture: ComponentFixture<PrjInfoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjInfoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
