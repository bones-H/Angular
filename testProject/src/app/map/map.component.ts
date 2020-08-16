import {AfterViewInit, Component} from '@angular/core';
import {MarkerService} from '../service/marker.service';

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
    this.map.on('preclick', () => {
      this.markerService.blurMarker(this.markerService.activatedId);
    });
  }

}
