import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {DayEntriesComponent} from './day-entries/day-entries.component';
import {AddEntryComponent} from "./entry/add-entry.component";
import {AddFormComponent} from "./entry/add-form.component";
import {SearchFoodComponent} from "./food/search-food.component";
import {routing} from "./router/routes";
import {AuthChecker} from "./router/auth-checker"
import {HomeComponent} from "./home/home.component"
//only for stub http requests
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TitleCasePipe} from "./pipes/title-case-pipe";
import {AddFoodComponent} from "./food/add-food.component";
import {EventsBroker} from "./broker/components-event-broker";
import {PeriodProgressMeasureComponent} from "./day-progress-bars/period-progress.component";
import {ProgressMeasureComponent} from "./day-progress-bars/progress-measure.component";
import {EntryService} from "./entry/entry-service";
import {FoodService} from "./food/food-service";
import {DateNavigatorComponent} from "./date-navigator/date-navigator.component";
import {LoginComponent} from "./auth/login.component";
import {UserService} from "./auth/user-service";
import {AuthHeaderInterceptor} from "./auth/auth-header.interceptor";
import {UserStorage} from "./auth/user-storage";

@NgModule({
  declarations: [
    AppComponent,
    DateNavigatorComponent,
    AddEntryComponent,
    DayEntriesComponent,
    AddFormComponent,
    SearchFoodComponent,
    LoginComponent,
    HomeComponent,
    TitleCasePipe,
    AddFoodComponent,
    PeriodProgressMeasureComponent,
    ProgressMeasureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    HttpModule,
    //EventsServiceModule.forRoot()
  ],
  providers: [
    UserStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    EventsBroker,
    EntryService,
    FoodService,
    AuthChecker,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
