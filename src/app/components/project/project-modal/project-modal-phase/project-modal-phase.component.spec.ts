import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectModalPhaseComponent } from './project-modal-phase.component';

describe('ProjectModalPhaseComponent', () => {
  let component: ProjectModalPhaseComponent;
  let fixture: ComponentFixture<ProjectModalPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectModalPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectModalPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
