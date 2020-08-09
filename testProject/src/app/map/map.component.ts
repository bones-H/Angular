import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from '../service/marker.service';
import {Marker} from '../interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map;
  private markers = {};

  constructor(private markerService: MarkerService) {
  }

  ngAfterViewInit(): void {
    this.map = this.markerService.getMap();
    this.markerService.getMarkers();
    this.map.on('preclick', (e) => {
      this.markerService.blurMarker(this.markerService.activatedId);
    });
  }

}
