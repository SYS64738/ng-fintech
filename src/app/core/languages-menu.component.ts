import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'ng-languages-menu',
  template: `
    <button mat-button class="mat-button " style="width:100px;" [matMenuTriggerFor]="menu">
    <span class="mat-button-wrapper" [style.color]="'#fff'">
      <mat-icon style="position: absolute; top: 7px;left: 12px" role="img" svgicon="flag" aria-hidden="true" *ngIf="currentLanguage && currentLanguage == 'en-US'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <mask id="z">
            <circle cx="256" cy="256" r="256" fill="#fff"/>
          </mask>
          <g mask="url(#z)">
            <path fill="#eee" d="M0 256L256 0h256v55.7l-20.7 34.5 20.7 32.2v66.8l-21.2 32.7L512 256v66.8l-24 31.7 24 35.1v66.7l-259.1 28.3L0 456.3v-66.7l27.1-33.3L0 322.8z"/>
            <path fill="#d80027" d="M256 256h256v-66.8H236.9zm-19.1-133.6H512V55.7H236.9zM512 512v-55.7H0V512zM0 389.6h512v-66.8H0z"/>
            <path fill="#0052b4" d="M0 0h256v256H0z"/>
            <path fill="#eee" d="M15 14.5L6.9 40H-20L1.7 55.8l-8.3 25.5L15 65.5l21.6 15.8-8.2-25.4L50.2 40H23.4zm91.8 0L98.5 40H71.7l21.7 15.8-8.3 25.5 21.7-15.8 21.7 15.8-8.3-25.4L142 40h-26.8zm91.9 0l-8.3 25.6h-26.8l21.7 15.8-8.3 25.5 21.7-15.8 21.6 15.7-8.2-25.3 21.7-16H207zM15 89.2l-8.3 25.5H-20l21.7 15.8-8.3 25.5L15 140l21.6 15.7-8.2-25.3 21.7-16H23.4zm91.8 0l-8.3 25.5H71.8l21.7 15.8-8.3 25.5 21.7-15.8 21.6 15.7-8.2-25.3 21.7-16h-26.8zm91.8 0l-8.3 25.5h-26.8l21.7 15.8-8.3 25.5 21.7-15.8 21.6 15.7-8.2-25.3 21.7-16H207zM15 163.6l-8.3 25.5H-20L1.6 205l-8.3 25.5L15 214.6l21.7 15.8-8.3-25.4 21.7-15.9H23.3zm91.8 0l-8.3 25.5H71.7L93.4 205l-8.3 25.5 21.7-15.8 21.7 15.8-8.3-25.4 21.7-15.9h-26.8zm91.8 0l-8.3 25.5h-26.8l21.7 15.8-8.3 25.5 21.7-15.8 21.7 15.8L212 205l21.7-15.9H207z"/>
          </g>
        </svg>
      </mat-icon>
      <mat-icon style="position: absolute; top: 7px;left: 12px" role="img" svgicon="flag" aria-hidden="true" *ngIf="currentLanguage && currentLanguage == 'it-IT'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <mask id="z">
            <circle cx="256" cy="256" r="256" fill="#fff"/>
          </mask>
          <g mask="url(#z)">
            <path fill="#eee" d="M167 0h178l25.9 252.3L345 512H167l-29.8-253.4z"/>
            <path fill="#6da544" d="M0 0h167v512H0z"/>
            <path fill="#d80027" d="M345 0h167v512H345z"/>
          </g>
        </svg>
      </mat-icon>
      {{ currentLanguage!.substring(0, 2).toUpperCase() }}
      <mat-icon role="img" style="position: absolute; top: 7px;right: 12px; color: white">
        arrow_drop_down
      </mat-icon>
      <mat-menu #menu="matMenu" xPosition="after">
        <a mat-menu-item (click)="useLanguage.emit('en-US')">
          <mat-icon
            role="img"
            svgicon="flag"
            aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <mask id="z">
                <circle cx="256" cy="256" r="256" fill="#fff"/>
              </mask>
              <g mask="url(#z)">
                <path fill="#eee" d="M0 256L256 0h256v55.7l-20.7 34.5 20.7 32.2v66.8l-21.2 32.7L512 256v66.8l-24 31.7 24 35.1v66.7l-259.1 28.3L0 456.3v-66.7l27.1-33.3L0 322.8z"/>
                <path fill="#d80027" d="M256 256h256v-66.8H236.9zm-19.1-133.6H512V55.7H236.9zM512 512v-55.7H0V512zM0 389.6h512v-66.8H0z"/>
                <path fill="#0052b4" d="M0 0h256v256H0z"/>
                <path fill="#eee" d="M15 14.5L6.9 40H-20L1.7 55.8l-8.3 25.5L15 65.5l21.6 15.8-8.2-25.4L50.2 40H23.4zm91.8 0L98.5 40H71.7l21.7 15.8-8.3 25.5 21.7-15.8 21.7 15.8-8.3-25.4L142 40h-26.8zm91.9 0l-8.3 25.6h-26.8l21.7 15.8-8.3 25.5 21.7-15.8 21.6 15.7-8.2-25.3 21.7-16H207zM15 89.2l-8.3 25.5H-20l21.7 15.8-8.3 25.5L15 140l21.6 15.7-8.2-25.3 21.7-16H23.4zm91.8 0l-8.3 25.5H71.8l21.7 15.8-8.3 25.5 21.7-15.8 21.6 15.7-8.2-25.3 21.7-16h-26.8zm91.8 0l-8.3 25.5h-26.8l21.7 15.8-8.3 25.5 21.7-15.8 21.6 15.7-8.2-25.3 21.7-16H207zM15 163.6l-8.3 25.5H-20L1.6 205l-8.3 25.5L15 214.6l21.7 15.8-8.3-25.4 21.7-15.9H23.3zm91.8 0l-8.3 25.5H71.7L93.4 205l-8.3 25.5 21.7-15.8 21.7 15.8-8.3-25.4 21.7-15.9h-26.8zm91.8 0l-8.3 25.5h-26.8l21.7 15.8-8.3 25.5 21.7-15.8 21.7 15.8L212 205l21.7-15.9H207z"/>
              </g>
            </svg>
          </mat-icon>
          <span>EN</span>
        </a>
        <a mat-menu-item (click)="useLanguage.emit('it-IT')">
          <mat-icon
            role="img"
            svgicon="flag"
            aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <mask id="z">
                <circle cx="256" cy="256" r="256" fill="#fff"/>
              </mask>
              <g mask="url(#z)">
                <path fill="#eee" d="M167 0h178l25.9 252.3L345 512H167l-29.8-253.4z"/>
                <path fill="#6da544" d="M0 0h167v512H0z"/>
                <path fill="#d80027" d="M345 0h167v512H345z"/>
              </g>
            </svg>
          </mat-icon>
          <span>IT</span>
        </a>
      </mat-menu>
    </span>
    </button>
  `
})
export class LanguagesMenuComponent {

  @Input() currentLanguage: string | undefined = undefined;
  @Output() useLanguage = new EventEmitter<string>()

}
