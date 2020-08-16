import {Component, EventEmitter, Output} from '@angular/core';
import {MarkerService} from '../../service/marker.service';

@Component({
  selector: 'app-create-marker',
  templateUrl: './create-marker.component.html',
  styleUrls: ['./create-marker.component.css']
})
export class CreateMarkerComponent {
  newMarkerType = '';
  newMarkerTitle = '';

  @Output() close = new EventEmitter<void>();

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
    this.close.emit();
  }
}
