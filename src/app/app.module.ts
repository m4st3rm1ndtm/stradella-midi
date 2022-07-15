import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ChordPadsComponent } from './chord-pads/chord-pads.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MatGridListModule],
  declarations: [AppComponent, HelloComponent, ChordPadsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
