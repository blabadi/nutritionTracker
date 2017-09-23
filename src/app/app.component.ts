import { Component } from '@angular/core';
import {Entry} from "./entry/entry";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  entryAdded(entry:Entry) {
    console.log('entryAdded..');
  }
}
