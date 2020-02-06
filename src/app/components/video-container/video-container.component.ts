import { Subscription } from "rxjs";
import { SpeechService } from "./../../services/speech.service";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input,
  EventEmitter,
  Output
} from "@angular/core";
import { WhiteListedAction } from "../../models/white-listed-action.enum";

@Component({
  selector: "app-video-container",
  templateUrl: "./video-container.component.html",
  styleUrls: ["./video-container.component.scss"]
})
export class VideoContainerComponent implements OnInit, OnDestroy {
  @ViewChild("video", { static: false }) video: ElementRef<HTMLVideoElement>;
  @Input() source: string;
  playbackRate = 1;
  @Output() videoComplete = new EventEmitter<void>();
  private subscriptions: Subscription[] = [];

  constructor(private speechService: SpeechService) {}

  ngOnInit() {
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

  triggerAction(action: WhiteListedAction) {
    switch (action) {
      case WhiteListedAction.pause:
        this.pause();
        break;
      case WhiteListedAction.abspielen:
        this.play();
        break;
      case WhiteListedAction.langsamer:
        this.decreasePlaybackSpeed();
        break;
      case WhiteListedAction.schneller:
        this.increasePlaybackSpeed();
        break;
    }
  }

  triggerVideoComplete() {
    this.videoComplete.emit();
  }

  private pause() {
    this.videoElement.pause();
    console.log("paused");
  }
  play() {
    this.videoElement.play();
    console.log("play");
  }

  private increasePlaybackSpeed() {
    this.playbackRate = this.playbackRate + 0.2;
    console.log("increasePlaybackSpeed");
  }

  private decreasePlaybackSpeed() {
    this.playbackRate = this.playbackRate - 0.2;
    console.log("decreasePlaybackSpeed");
  }

  private normalPlaybackSpeed() {
    this.playbackRate = 1;
    console.log("decreasePlaybackSpeed");
  }
}
