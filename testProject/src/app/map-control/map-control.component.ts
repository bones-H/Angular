import {Component, Input} from '@angular/core';
import {JsonService} from '../service/json.service';
import {Marker} from '../interface';


@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.css']
})
export class MapControlComponent {

  markerType = ''
  markerTitle = ''

  @Input() filteredArr: Marker[]

  constructor(
    public serviceHTTP: JsonService
  ) { }


  focusMarker($event) {
    this.serviceHTTP.activatedMarker(+$event.target.id)
  }

  blurMarker() {
    this.serviceHTTP.deactivatedMarker(this.serviceHTTP.activatedId)
    this.serviceHTTP.activatedId = 0
  }
  createMarker() {
    this.serviceHTTP.newMarker = {
      coordinates: [0, 0],
      id: this.serviceHTTP.lastId + 1,
      type: this.markerType,
      title: this.markerTitle,
      active: false
    }
    this.markerTitle = this.markerType = null
  }



}
