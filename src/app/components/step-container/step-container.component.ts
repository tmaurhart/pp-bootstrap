import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Step } from "src/app/models/step.model";

@Component({
  selector: "app-step-container",
  templateUrl: "./step-container.component.html",
  styleUrls: ["./step-container.component.scss"]
})
export class StepContainerComponent implements OnInit {
  @Input() steps: Step[];
  @Output() stepChange = new EventEmitter<Step>();

  constructor() {}

  ngOnInit() {}

  goToStep(step: Step) {
    this.stepChange.emit(step);
  }
}
