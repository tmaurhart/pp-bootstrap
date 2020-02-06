import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LearningPath } from "src/app/models/learning-path.model";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { StoreService } from "src/app/services/store-service.service";
import { switchMap } from "rxjs/operators";
import { NavigationService } from "src/app/services/navigation.service";
import { ActionType } from "src/app/models/action-type.enum";
import { DataService, SidenavMode } from "src/app/services/data.service";

@Component({
  selector: "app-learning-path-overview",
  templateUrl: "./learning-path-overview.component.html",
  styleUrls: ["./learning-path-overview.component.scss"]
})
export class LearningPathOverviewComponent implements OnInit {
  learningPaths$: Observable<LearningPath[]>;

  constructor(
    private store: StoreService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.learningPaths$ = this.store.getAll();
    this.learningPaths$.subscribe(learningPaths => console.log(learningPaths));
  }

  goToPath(id: string, action: ActionType) {
    this.router.navigate([this.navigationService.goToPathPage(id, action)]);
  }

  createNewPath() {
    this.router.navigate([this.navigationService.getNewPathPage()]);
  }

  editPath(id: string) {
    this.router.navigate([this.navigationService.getEditPathPage(id)]);
  }

  deletePath(id: string) {
    this.store.delete(id);
    console.log("DELETE PATH WITH ID " + id);
  }
}
