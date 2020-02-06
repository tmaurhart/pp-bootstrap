import { Step } from "./models/step.model";
import { LearningPath, Operation } from "./models/learning-path.model";
import { defaultSteps } from "./default-steps";

export const defaultLearningPath: LearningPath = {
  id: "0",
  name: "Standard Lernpfad",
  createdAt: new Date(),
  isDefault: true,
  operation: Operation.KATARAKT,
  steps: defaultSteps
};

export const defaultLearningPath2: LearningPath = {
  id: "1",
  name: "Lernpfad 2",
  createdAt: new Date(),
  isDefault: false,
  operation: Operation.KATARAKT,
  steps: defaultSteps
};

export const defaultLearningPath3: LearningPath = {
  id: "2",
  name: "Lernpfad 3",
  createdAt: new Date(),
  isDefault: true,
  operation: Operation.KATARAKT,
  steps: defaultSteps
};
