import { Component, OnInit, Input } from "@angular/core";
import { DataService, SidenavMode } from "src/app/services/data.service";
import { Observable } from "rxjs";
import { Step } from "src/app/models/step.model";
import { Router } from "@angular/router";
import { NavigationService } from "src/app/services/navigation.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  currentStep: Step;
  sidenavMode = SidenavMode.HIDE;

  constructor(
    private dataService: DataService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.dataService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
    this.dataService.sidenavMode$.subscribe(sidenavMode => {
      this.sidenavMode = sidenavMode;
    });
  }

  get getTools() {
    const splitTools = this.currentStep.tools.split("\n");
    const tools = splitTools.map(tool => {
      return {
        name: tool,
        showDetails: false
      };
    });
    return tools;
  }

  get showInformation() {
    return (
      this.sidenavMode === SidenavMode.INFORMATION ||
      this.sidenavMode === SidenavMode.SIDEBAR
    );
  }

  get showTools() {
    return (
      this.sidenavMode === SidenavMode.TOOLS ||
      this.sidenavMode === SidenavMode.SIDEBAR
    );
  }

  get showComplications() {
    return (
      this.sidenavMode === SidenavMode.COMPLICATIONS ||
      this.sidenavMode === SidenavMode.SIDEBAR
    );
  }

  goToRoot() {
    this.router.navigate([this.navigationService.getOverviewPage()]);
  }
}
