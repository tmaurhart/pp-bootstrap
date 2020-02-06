import { Injectable } from "@angular/core";
import { Routes } from "../routes";
import { ActionType } from "../models/action-type.enum";

@Injectable({
  providedIn: "root"
})
export class NavigationService {
  goToPathPage(id: string, action: ActionType) {
    return Routes.PATH_PAGE + "/" + id + "/" + action;
  }
  getNewPathPage() {
    return Routes.NEW_PATH_PAGE;
  }
  getEditPathPage(id: string) {
    return Routes.EDIT_PATH_PAGE + "/" + id;
  }
  getOverviewPage() {
    return Routes.GET_OVERVIEW_PAGE;
  }
}
