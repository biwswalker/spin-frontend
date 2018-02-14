import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectModalDetailComponent } from './project-modal-detail.component';

describe('ProjectModalDetailComponent', () => {
  let component: ProjectModalDetailComponent;
  let fixture: ComponentFixture<ProjectModalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectModalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectModalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
