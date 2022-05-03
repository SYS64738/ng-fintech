import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { StyleManagerService } from "./style-manager.service";
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalPreferences} from "../../shared/local.preferences";
import {Theme} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // observable per sincronizzare il tema corrente...
  currentTheme$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>({
    'backgroundColor': '#fff',
    'buttonColor': '#ffab40',
    'headingColor': '#004d40',
    'label': 'Teal & Orange',
    'value': 'teal-orange',
    'type': 'light'
  });

  private _defaultTheme: string = this.currentTheme$.getValue().value;
  private _settings = new LocalPreferences('theme');

  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService,
  ) {}

  getThemes(): Observable<Array<Theme>> {
    return this.http.get<Array<Theme>>("assets/themes/themes.json");
  }

  loadTheme() {
    this.setTheme(this._settings.getPreferencesValue('currentTheme') || this._defaultTheme);
  }

  setTheme(themeToSet: string) {
    // imposto tema...
    this.styleManager.setStyle(
      "theme",
      `assets/themes/${themeToSet}.css`
    );
    // memorizzo nello storage...
    this._settings.setPreferencesValue('currentTheme', themeToSet);
    // notifico il cambio tema...
    this.getThemes().pipe(
      map(themes => themes.find(theme => theme.value === themeToSet)),
    ).subscribe(theme => {
      if (theme)
        this.currentTheme$.next(theme);
    });
  }

  getCurrentTheme() {
    return this.currentTheme$.getValue();
  }

}
