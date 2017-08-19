import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DayEntriesComponent} from './day-entries/day-entries.component';
import {AddEntryComponent} from "./entry/add-entry.component";
import {SearchFoodComponent} from "./food/search-food.component";

@NgModule({
  declarations: [
    AppComponent,
    DayEntriesComponent,
    AddEntryComponent,
    SearchFoodComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
