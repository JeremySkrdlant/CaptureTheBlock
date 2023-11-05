import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { MainWindowComponent } from './main-window/main-window.component';
import { YourTokensComponent } from './your-tokens/your-tokens.component';

@NgModule({
  declarations: [
    AppComponent,
    Step1Component,
    Step2Component,
    MainWindowComponent,
    YourTokensComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
