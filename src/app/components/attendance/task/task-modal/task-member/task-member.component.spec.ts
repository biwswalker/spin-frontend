import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMemberComponent } from './task-member.component';

describe('TaskMemberComponent', () => {
  let component: TaskMemberComponent;
  let fixture: ComponentFixture<TaskMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
