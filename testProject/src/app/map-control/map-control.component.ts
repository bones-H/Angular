import {Component, Input} from '@angular/core';
import {MarkerService} from '../service/marker.service';
import {Marker} from '../interface';

@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.css'],
})
export class MapControlComponent {
  newMarkerType = '';
  newMarkerTitle = '';


  constructor(public markerService: MarkerService) {
  }

  createMarker() {
    const id = ++this.markerService.lastId;
    let newMarker = {
      coordinates: [0, 0],
      id: id,
      type: this.newMarkerType,
      title: this.newMarkerTitle,
      active: false,
    };
    this.newMarkerTitle = this.newMarkerType = null;
    this.markerService.placeMarker(newMarker);
  }
}
