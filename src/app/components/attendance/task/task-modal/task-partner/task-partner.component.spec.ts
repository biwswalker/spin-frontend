import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPartnerComponent } from './task-partner.component';

describe('TaskMemberComponent', () => {
  let component: TaskPartnerComponent;
  let fixture: ComponentFixture<TaskPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
