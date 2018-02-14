import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectModalMemberComponent } from './project-modal-member.component';

describe('ProjectModalMemberComponent', () => {
  let component: ProjectModalMemberComponent;
  let fixture: ComponentFixture<ProjectModalMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectModalMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectModalMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
