import {AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import {JsonService} from '../service/json.service';
import {Marker} from '../interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges{
  private map

  markers = {}

  iconLocation = L.icon({
    iconUrl: 'https://svgsilh.com/svg/1093167-ff5722.svg',
    iconSize: [50, 50]
  })
  iconEvent = L.icon({
    iconUrl: 'https://svgsilh.com/svg/1915456-ff5722.svg',
    iconSize: [50, 50]
  })
  iconDefault = L.icon({
    iconUrl: 'https://svgsilh.com/svg/1566741.svg',
    iconSize: [50, 50]
  })

  markerOptions = {
    title: "MyLocation",
    clickable: true,
    draggable: true,
    icon: this.iconDefault
  }

  @Input() activatedId: number
  @Input() removeId: number
  @Input() newMarker: Marker
  constructor(private serviceHTTP: JsonService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes.activatedId){
      this.focusMarker(changes.activatedId.currentValue)
      this.blurMarker(changes.activatedId.previousValue)
      console.log(1)
    } else if(changes.removeId){
      this.removeMarker(changes.removeId.currentValue)
      console.log(2)
    } else {
      console.log(3)
      this.map.on("click", e => {
        this.serviceHTTP.newMarker.coordinates = [e.latlng.lat, e.latlng.lng]
        this.addMarkers(this.serviceHTTP.newMarker)

        console.log(this.serviceHTTP.newMarker)
      })

    }


  }

  ngAfterViewInit(): void {
    this.initMap()
    this.serviceHTTP.getMarkers().subscribe(data => {
      data.forEach(el => {
        const m = {...el, ...{active: false}}
        this.addMarkers(m)
      })
    })


  }


  private initMap(): void {
    this.map = L.map('map', {
      center: [ 59.9310584, 30.3609096 ],
      zoom: 10
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }

  focusMarker(id: number) {
    if (id > 0) {
      this.markers[id]._icon.classList.add('marker-active')
      this.map.panTo(this.markers[id].getLatLng())
    }
  }

  blurMarker(id) {
    if (id > 0) {
      this.serviceHTTP.deactivatedMarker(id)
      this.markers[id]._icon.classList.remove('marker-active')
    }
  }

  updateMarkers(el) {
    let icon
      switch (el.type) {
        case "Place":
          icon = this.iconLocation
          break
        case "Event":
          icon = this.iconEvent
          break
        default:
          icon = this.iconDefault
      }
      const marker = {...el, ...{options: {
          title: el.title,
          icon: icon
        }}}
      return marker

  }

  addMarkers(el){
    this.serviceHTTP.markerArr.push(el)
    let marker = this.updateMarkers(el)

    this.markers[marker.id] = L.marker(marker.coordinates, marker.options).addTo(this.map)
    this.markers[marker.id].on('click', e => {
      this.serviceHTTP.activatedMarker(+marker.id)
      this.focusMarker(+marker.id)
    })

  }
  removeMarker(id) {
    this.markers[id].removeFrom(this.map)
  }
}
