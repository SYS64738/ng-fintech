import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {registerLocaleData} from "@angular/common";
import localeit from '@angular/common/locales/it';
import {DateAdapter} from "@angular/material/core";
import {ThemeService} from "./core/themes/theme.service";
import {Theme} from './models';
import {AuthService} from "./core/auth.service";
import {UserStore} from "./store/user.store";

@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loginPage: boolean = false;
  title: string | null = null;
  language: string | undefined = undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  themes$: Observable<Theme[]> = this.themeService.getThemes();

  constructor(
    public userStore: UserStore,
    public authService: AuthService,
    public themeService: ThemeService,
    private breakpointObserver: BreakpointObserver,
    private dateAdapter: DateAdapter<any>,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService) {

    registerLocaleData(localeit);

    this.language = translate.getBrowserCultureLang();

    // potrebbe essere stata impostata una lingua senza il gruppo linguistico...
    if (this.language === 'en') {
      this.language = 'en-US';
    } else if (this.language === 'it') {
      this.language = 'it-IT';
    }

    translate.use(this.language!);
    dateAdapter.setLocale(this.language);

    router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url)
    ).subscribe((url) => {
      console.log(`navigate to > ${url}`);
      this.setTitle(url);
      this.loginPage = url === '/' || url === '/login';
    });

  }

  ngOnInit() {
    this.themeService.loadTheme();
  }

  goToHome = () => this.router.navigateByUrl('homepage');

  setTitle = (url: string) => this.title = `${url !== '/' ? url.substring(1).split('/')[0] : 'login'}.menu`;

  useTheme = (theme: string) => this.themeService.setTheme(theme);

  useLanguage(language: string) {
    this.language = language;
    this.translate.use(this.language);
    this.dateAdapter.setLocale(this.language);
  }

}
