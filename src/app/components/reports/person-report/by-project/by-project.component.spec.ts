import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByProjectComponent } from './by-project.component';

describe('ByProjectComponent', () => {
  let component: ByProjectComponent;
  let fixture: ComponentFixture<ByProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
