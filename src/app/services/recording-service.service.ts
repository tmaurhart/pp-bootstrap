import { Injectable, NgZone } from "@angular/core";
import * as RecordRTC from "recordrtc";
import * as moment from "moment";
import { Observable, Subject } from "rxjs";
import { isNullOrUndefined } from "util";
import { RecordedVideo } from "../models/recorded-video.model";

@Injectable({ providedIn: "root" })
export class RecordingService {
  private stream;
  private recorder;

  async startRecording() {
    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    this.record();
  }

  abortRecording() {
    this.stopMedia();
  }

  private record() {
    this.recorder = new RecordRTC.RecordRTCPromisesHandler(this.stream, {
      type: "video",
      mimeType: "video/webm"
    });

    this.recorder.startRecording();
  }

  async stopRecording(): Promise<Blob | Error> {
    try {
      await this.recorder.stopRecording();
      const blob = await this.recorder.getBlob();
      this.stopMedia();
      return blob;
    } catch (err) {
      this.stopMedia();
      return err;
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
    }
  }
}
