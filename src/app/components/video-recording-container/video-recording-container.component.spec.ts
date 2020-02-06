import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRecordingContainerComponent } from './video-recording-container.component';

describe('VideoRecordingContainerComponent', () => {
  let component: VideoRecordingContainerComponent;
  let fixture: ComponentFixture<VideoRecordingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoRecordingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoRecordingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
