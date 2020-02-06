import { Step } from "./models/step.model";
import { Routes } from "./routes";

export const defaultSteps: Step[] = [
  {
    id: "0",
    name: "Step 1",
    tools: "nice tools",
    information: "cut into eye",
    complications: "many",
    videos: [
    ],
    instructionVideoSource: Routes.VIDEO_FOLDER + "/video_1_Katarakt.mp4"
  },
  {
    id: "1",
    name: "Step 2",
    tools: "more nice tools",
    information: "cut deeper into eye",
    complications: "many more",
    videos: [
    ],
    instructionVideoSource: Routes.VIDEO_FOLDER + "/video_2_Katarakt.mp4"
  },
  {
    id: "2",
    name: "Step 3",
    tools: "the best tools",
    information: "remove the eye",
    complications: "no vision",
    videos: [
    ],
    instructionVideoSource: Routes.VIDEO_FOLDER + "/video_3_Katarakt.mp4"
  }
];
