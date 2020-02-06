import { RecordedVideo } from "./recorded-video.model";
import { StoredVideo } from "./stored-video.model";

export interface Step {
  id: string;
  name: string;
  tools: string;
  information: string;
  complications: string;
  videos: StoredVideo[];
  instructionVideoSource: string;
}
