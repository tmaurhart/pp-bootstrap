import { SpeechService } from "./../../services/speech.service";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input
} from "@angular/core";
import { RecordingService } from "src/app/services/recording-service.service";
import { StoreService } from "src/app/services/store-service.service";
import { Subscription, Observable } from "rxjs";
import { RecordedVideo } from "src/app/models/recorded-video.model";
import { LearningPath } from "src/app/models/learning-path.model";
import { defaultLearningPath } from "src/app/default-learning-path";
import { Step } from "src/app/models/step.model";
import { StoredVideo } from "src/app/models/stored-video.model";
import { WhiteListedAction } from "src/app/models/white-listed-action.enum";

@Component({
  selector: "app-video-recording-container",
  templateUrl: "./video-recording-container.component.html",
  styleUrls: ["./video-recording-container.component.scss"]
})
export class VideoRecordingContainerComponent implements OnInit, OnDestroy {
  @ViewChild("video", { static: false }) video: ElementRef<HTMLVideoElement>;
  @ViewChild("videoPreview", { static: false }) videoPreview: ElementRef<
    HTMLVideoElement
  >;

  @Input() currentStepIndex: number;
  @Input() currentLearningPath: LearningPath;
  private subscriptions: Subscription[] = [];
  isRecording = false;

  constructor(
    private recordingService: RecordingService,
    private storageService: StoreService,
    private speechService: SpeechService
  ) {}

  ngOnInit() {
    this.startCamera();
    this.currentLearningPath = defaultLearningPath;
    this.subscriptions.push(
      this.speechService.listen().subscribe(triggeredActions => {
        triggeredActions.forEach(triggeredAction =>
          this.triggerAction(triggeredAction)
        );
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  get videoElement() {
    return this.video.nativeElement;
  }

  startRecording() {
    this.isRecording = true;
    this.recordingService.startRecording();
  }

  triggerAction(action: WhiteListedAction) {
    switch (action) {
      case WhiteListedAction.aufnehmen:
        this.startRecording();
        break;
      case WhiteListedAction.stop:
        this.stopRecording();
        break;
    }
  }

  async stopRecording() {
    try {
      this.isRecording = false;
      const blob = (await this.recordingService.stopRecording()) as Blob;
      this.storeVideo(blob);
    } catch (err) {
      console.log(err);
    }
  }

  async storeVideo(blob: Blob) {
    const fileName = new Date().toISOString() + "_Katarakt.webm";
    const fileUrl = (await this.storageService.storeVideo({
      blob,
      fileName
    })) as string;

    const newVideo: StoredVideo = {
      path: fileUrl,
      fileName
    };
    this.updateLearningPath(newVideo);
  }

  async updateLearningPath(newVideo: StoredVideo) {
    // get the most recent current path data
    const getPath = await this.storageService
      .read(this.currentLearningPath.id)
      .toPromise();

    // make a deep copy of the current learningpath
    const updatedLearningPath: LearningPath = JSON.parse(
      JSON.stringify(getPath)
    );

    updatedLearningPath.steps[this.currentStepIndex].videos.push(newVideo);

    this.storageService.update(updatedLearningPath);
  }

  async startCamera() {
    if (navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        this.videoElement.srcObject = stream;
        this.videoElement.play();
      } catch (err) {
        console.log("error connecting to camera");
        console.log(err);
      }
    }
  }

  playVideo() {
    this.videoElement.play();
  }
}
