import { LearningPath } from "./../models/learning-path.model";
import { Injectable } from "@angular/core";
import { NgForage, NgForageCache } from "ngforage";
import { Observable, from, Subject } from "rxjs";
import { RecordedVideo } from "../models/recorded-video.model";
import { defaultLearningPath, defaultLearningPath2, defaultLearningPath3 } from '../default-learning-path';


@Injectable({
  providedIn: "root"
})
export class StoreService {
  constructor(private readonly ngf: NgForage, private readonly ngfCache: NgForageCache) {}

  getAll(): Observable<LearningPath[]> {
    const result = new Subject<LearningPath[]>();
    const learningPaths: LearningPath[] = [];
    this.onNgfReady(() => {
      this.ngf
        .iterate((value, key) => {
          if (key.indexOf("video") < 0) {
            learningPaths.push(value as LearningPath);
          }
        })
        .then(() => {
          result.next(learningPaths);
          result.complete();
        });
    });
    return result.asObservable();
  }

  update(learningPath: LearningPath) {
    this.onNgfReady(() => {
      this.ngfCache.setCached(learningPath.id, learningPath);
      this.ngf.setItem(learningPath.id, learningPath);
    });
  }

  create(learningPath: LearningPath) {
    learningPath.isDefault = false;
    return this.update(learningPath);
  }

  read(id: string): Observable<LearningPath> {
    return from(
      this.ngf.ready().then(() => {
        return this.ngf.getItem<LearningPath>(id);
      })
    );
  }

  delete(id: string) {
    this.onNgfReady(() => {
      this.ngfCache.removeCached(id);
      this.ngf.removeItem(id);
    });
  }

  async seedDefaults() {
    const all = await this.getAll().toPromise();
    if (!all || !all.length) {
      this.update(defaultLearningPath);
      this.update(defaultLearningPath2);
      this.update(defaultLearningPath3);
    }
  }

  private onNgfReady(fn: () => void) {
    this.ngf.ready().then(() => fn());
  }

  async getVideo(fileName: string, isDefault?: boolean): Promise<Blob> {
    await this.ngf.ready();
    return await this.ngf.getItem("video_" + fileName);
  }

  async storeVideo(recordedVideo: RecordedVideo) {
    try {
      await this.ngf.ready();
      await this.ngf.setItem(
        "video_" + recordedVideo.fileName,
        recordedVideo.blob
      );
      console.log("SAVED VIDEO");
      return "video_" + recordedVideo.fileName;
    } catch (err) {
      console.log("ERROR SAVING VIDEO");
      return false;
    }
  }

  async removeVideo(fileName: string) {
    try {
      await this.ngf.ready();
      await this.ngfCache.removeCached(fileName);
      await this.ngf.removeItem(fileName);
      console.log("REMOVED VIDEO");
      return true;
    } catch (err) {
      console.log("ERROR REMOVING VIDEO");
      return false;
    }
  }
}
