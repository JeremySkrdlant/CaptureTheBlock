import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BlockStatViewComponent } from './block-stat-view/block-stat-view.component';
import { TestControlsComponent } from './test-controls/test-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockStatViewComponent,
    TestControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
