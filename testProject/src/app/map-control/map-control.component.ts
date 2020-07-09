import { Component } from '@angular/core';
import {JsonService} from '../service/json.service';

@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.css']
})
export class MapControlComponent {

  markerType = ''
  markerTitle = ''
  markerId = null

  constructor(public serviceHTTP: JsonService) { }

  focusMarker($event) {

    this.serviceHTTP.activatedMarker(+$event.target.id)

  }

  blurMarker() {
    this.serviceHTTP.deactivatedMarker(this.serviceHTTP.activatedId)
  }
  createMarker() {
    this.serviceHTTP.newMarker = {
      coordinates: [0, 0],
      id: this.markerId,
      type: this.markerType,
      title: this.markerTitle,
      active: false
    }
    this.markerTitle = this.markerType = this.markerId = null
  }
}
