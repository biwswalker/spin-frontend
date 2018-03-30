import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByTagComponent } from './by-tag.component';

describe('ByTagComponent', () => {
  let component: ByTagComponent;
  let fixture: ComponentFixture<ByTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
