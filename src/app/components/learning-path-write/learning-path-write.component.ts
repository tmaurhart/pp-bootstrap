import { StoreService } from "./../../services/store-service.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from "rxjs";
import { LearningPath } from "src/app/models/learning-path.model";
import { switchMap, tap } from "rxjs/operators";
import { defaultLearningPath } from "src/app/default-learning-path";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CdkDragSortEvent } from "@angular/cdk/drag-drop";
import { NavigationService } from "src/app/services/navigation.service";

enum Mode {
  EDIT = "edit",
  NEW = "new"
}

@Component({
  selector: "app-learning-path-write",
  templateUrl: "./learning-path-write.component.html",
  styleUrls: ["./learning-path-write.component.scss"]
})
export class LearningPathWriteComponent implements OnInit {
  learningPath$: Observable<LearningPath>;
  mode: Mode = Mode.EDIT;
  form: FormGroup;
  learningPath: LearningPath;
  changesSaved = false;

  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.learningPath$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get("id");
        if (id) {
          return this.store.read(params.get("id"));
        } else {
          this.mode = Mode.NEW;
          return this.store.read(defaultLearningPath.id);
        }
      })
    );
    this.learningPath$.subscribe(
      learningPath => (this.learningPath = learningPath)
    );
  }

  update() {
    if (this.mode === Mode.NEW) {
      this.learningPath.id =
        Math.random()
          .toString(36)
          .substring(2) + Date.now().toString(36);
      this.learningPath.createdAt = new Date();
    }
    this.store.update(this.learningPath);
    this.changesSaved = true;
  }

  goBack() {
    this.router.navigate([this.navigationService.getOverviewPage()]);
  }

  onSort(event: CdkDragSortEvent) {
    const helper = {
      ...this.learningPath.steps[event.previousIndex]
    };
    this.learningPath.steps[event.previousIndex] = this.learningPath.steps[
      event.currentIndex
    ];
    this.learningPath.steps[event.currentIndex] = helper;
  }
}
