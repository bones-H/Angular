import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from '../service/marker.service';
import {Marker} from '../interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {
  private map
  private markers = {}

  @Input() activatedId: number
  @Input() removeId: number
  @Input() newMarker: Marker
  @Input() filteredArr: Marker[]
  constructor(private markerService: MarkerService) { }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.activatedId){
      this.focusMarker(changes.activatedId.currentValue)
      this.blurMarker(changes.activatedId.previousValue)
    } else if(changes.removeId){
      this.removeMarker(changes.removeId.currentValue)
    } else if (changes.newMarker){
      this.map.on("click", e => {
        this.markerService.newMarker.coordinates = [e.latlng.lat, e.latlng.lng]
        this.addMarkers(this.markerService.newMarker)
        this.markerService.markerArr.push(this.markerService.newMarker)
        this.markerService.filterMarkers()
        this.map.off("click")
      })
    }  else if (changes.filteredArr){
      this.removeAllMarkers()
      this.markerService.filteredArr.forEach(el => this.addMarkers(el))
    }
  }

  ngAfterViewInit(): void {
    this.initMap()
    this.markerService.getMarkers()
  }



  private initMap(): void {
    this.map = L.map('map', {
      center: [ 59.9310584, 30.3609096 ],
      zoom: 10
    })
    this.map.on('preclick', e => {
      this.blurMarker(this.markerService.activatedId)
    })
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    tiles.addTo(this.map)
  }

  focusMarker(id: number) {
    if (id) {
      this.markers[id]._icon.classList.add('marker-active')
      this.map.panTo(this.markers[id].getLatLng())
    }
  }

  blurMarker(id: number) {
    if (id) {
      this.markerService.deactivatedMarker(id)
      this.markers[id]?._icon.classList.remove('marker-active')
    }
  }

  addMarkers(el: Marker){
    let marker = this.markerService.updateMarkers(el)
    this.markers[marker.id] = L.marker(marker.coordinates, marker.options).addTo(this.map)
    this.markers[marker.id].on('click', e => {
      this.markerService.activatedMarker(+marker.id)
      this.focusMarker(+marker.id)
    })
  }
  removeMarker(id: number) {
    this.markers[id].removeFrom(this.map)
    delete this.markers[id]
  }
  removeAllMarkers() {
    for (let key in this.markers){
      this.markers[key].removeFrom(this.map)
      delete this.markers[key]
    }
  }


}
