import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPathWriteComponent } from './learning-path-write.component';

describe('LearningPathWriteComponent', () => {
  let component: LearningPathWriteComponent;
  let fixture: ComponentFixture<LearningPathWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningPathWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningPathWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
