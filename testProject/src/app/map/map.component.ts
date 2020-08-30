import {AfterViewInit, Component} from '@angular/core';
import {MarkerService} from '../service/marker.service';
import {MapService} from '../service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map;


  constructor(
    private markerService: MarkerService,
    private mapService: MapService
  ) {
  }

  ngAfterViewInit(): void {
    this.map = this.mapService.initMap();
    this.markerService.getMarkers();
    this.map.on('preclick', () => {
      this.markerService.blurMarker(this.markerService.activatedId);
    });
  }

}
