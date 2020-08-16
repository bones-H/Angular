import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Marker} from '../../interface';
import {MarkerService} from '../../service/marker.service';

@Component({
  selector: 'app-delete-marker',
  templateUrl: './delete-marker.component.html',
  styleUrls: ['./delete-marker.component.css']
})
export class DeleteMarkerComponent{
  @Input() marker: Marker;
  @Output() close = new EventEmitter<void>();

  constructor(public markerService: MarkerService) {
  }

  deleteMarker() {
    this.markerService.removeMarker(this.marker);
    this.close.emit();
  }
}
