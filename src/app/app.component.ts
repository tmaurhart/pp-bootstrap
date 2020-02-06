import { StoreService } from "./services/store-service.service";
import { Component } from "@angular/core";
import { DataService, SidenavMode } from "./services/data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  showSidebar = true;

  constructor(private store: StoreService, private dataService: DataService) {
    this.store.seedDefaults();

    this.dataService.sidenavMode$.subscribe(mode => {
      if (mode === SidenavMode.HIDE) {
        this.showSidebar = false;
      } else {
        this.showSidebar = true;
      }
    });
  }
}
