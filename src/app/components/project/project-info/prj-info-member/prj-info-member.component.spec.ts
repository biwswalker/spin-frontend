import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjInfoMemberComponent } from './prj-info-member.component';

describe('PrjInfoMemberComponent', () => {
  let component: PrjInfoMemberComponent;
  let fixture: ComponentFixture<PrjInfoMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjInfoMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjInfoMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
