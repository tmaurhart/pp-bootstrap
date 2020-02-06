import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  RxSpeechRecognitionService,
  SpeechRecognitionModule
} from "@kamiazya/ngx-speech-recognition";
import { AppComponent } from "./app.component";
import { VideoContainerComponent } from "./components/video-container/video-container.component";
import { LearningPathOverviewComponent } from "./components/learning-path-overview/learning-path-overview.component";
import { LearningPathWriteComponent } from "./components/learning-path-write/learning-path-write.component";
import { StepContainerComponent } from "./components/step-container/step-container.component";
import { StepComponent } from "./components/step/step.component";
import { NgForageModule } from "ngforage";
import { VideoRecordingContainerComponent } from "./components/video-recording-container/video-recording-container.component";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSidenavModule } from "@angular/material/sidenav";
import { LearningPathComponent } from "./components/learning-path/learning-path.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SidenavComponent } from "./components/sidenav/sidenav.component";

const appRoutes: Routes = [
  { path: "learning-path/edit/new", component: LearningPathWriteComponent, pathMatch: "full" },
  { path: "learning-path/edit/:id", component: LearningPathWriteComponent, pathMatch: "full" },
  { path: "learning-path/:id/:type", component: LearningPathComponent },
  {
    path: "learning-paths",
    component: LearningPathOverviewComponent
  },
  { path: "", redirectTo: "/learning-paths", pathMatch: "full" },
  { path: "**", redirectTo: "/learning-paths", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    VideoContainerComponent,
    LearningPathOverviewComponent,
    LearningPathWriteComponent,
    StepContainerComponent,
    StepComponent,
    VideoRecordingContainerComponent,
    LearningPathComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    // Optional in Angular 6 and up
    NgForageModule.forRoot(),
    SpeechRecognitionModule.withConfig({
      lang: "de-de",
      continuous: true,
      interimResults: true,
      maxAlternatives: 1
    }),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    DragDropModule
  ],
  providers: [RxSpeechRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
