import {Component} from '@angular/core';
import {JsonService} from './service/json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(public service: JsonService) {
  }
}
