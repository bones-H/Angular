import { Component, Input } from '@angular/core';
import { MarkerService } from '../service/marker.service';
import { Marker } from '../interface';

@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.css'],
})
export class MapControlComponent {
  markerType = '';
  markerTitle = '';

  @Input() filteredArr: Marker[];

  constructor(public markerService: MarkerService) {}

  focusMarker($event) {
    this.markerService.activateMarker(+$event.target.id);
  }

  blurMarker() {
    this.markerService.deactivateMarker(this.markerService.activatedId);
    this.markerService.activatedId = 0;
  }
  createMarker() {
    const id = ++this.markerService.lastId;
    this.markerService.newMarker = {
      coordinates: [0, 0],
      id: id,
      type: this.markerType,
      title: this.markerTitle,
      active: false,
    };
    this.markerTitle = this.markerType = null;
  }
}
