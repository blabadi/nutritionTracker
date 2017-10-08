import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {DayEntriesComponent} from './day-entries/day-entries.component';
import {AddEntryComponent} from "./entry/add-entry.component";
import {AddFormComponent} from "./entry/add-form.component";
import {SearchFoodComponent} from "./food/search-food.component";

//only for stub http requests
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { HttpModule } from '@angular/http';

import { EventsServiceModule } from 'angular-event-service';
import { EventsService } from 'angular-event-service';
import {TitleCasePipe} from "./pipes/title-case-pipe";
import {AddFoodComponent} from "./food/add-food.component";

@NgModule({
  declarations: [
    AppComponent,
    AddEntryComponent,
    DayEntriesComponent,
    AddFormComponent,
    SearchFoodComponent,
    TitleCasePipe,
    AddFoodComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    HttpModule,
    EventsServiceModule.forRoot()
  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
