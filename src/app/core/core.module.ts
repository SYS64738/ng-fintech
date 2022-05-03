import {NgModule} from "@angular/core";
import {ThemesMenuComponent} from "./themes/themes-menu.component";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../shared/material/material.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ThemesMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forChild()
  ],
  exports: [
    ThemesMenuComponent
  ]
})
export class CoreModule {}
