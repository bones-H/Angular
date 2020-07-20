import { Component, OnDestroy } from '@angular/core';
import { MarkerService } from './service/marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public markerService: MarkerService) {}
}
