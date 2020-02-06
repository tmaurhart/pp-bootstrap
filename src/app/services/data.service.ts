import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Step } from "../models/step.model";

export enum SidenavMode {
  SIDEBAR = "sidebar",
  TOOLS = "tools",
  INFORMATION = "information",
  COMPLICATIONS = "complications",
  HIDE = "hide"
}

@Injectable({
  providedIn: "root"
})
export class DataService {
  currentStep$: Subject<Step> = new Subject();
  sidenavMode$ = new BehaviorSubject<SidenavMode>(SidenavMode.HIDE);

  constructor() {}

  setCurrentStep(step: Step) {
    this.currentStep$.next(step);
  }

  setSidenavMode(mode: SidenavMode) {
    this.sidenavMode$.next(mode);
  }

  toggleSidebar() {
    if (this.sidenavMode$.getValue() !== SidenavMode.HIDE) {
      this.setSidenavMode(SidenavMode.HIDE);
    } else {
      this.setSidenavMode(SidenavMode.SIDEBAR);
    }
  }

  showSidebar() {
    this.setSidenavMode(SidenavMode.SIDEBAR);
  }

  showTools() {
    this.setSidenavMode(SidenavMode.TOOLS);
  }

  showComplications() {
    this.setSidenavMode(SidenavMode.COMPLICATIONS);
  }

  showInformation() {
    this.setSidenavMode(SidenavMode.INFORMATION);
  }
}
