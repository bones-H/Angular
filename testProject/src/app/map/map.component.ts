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

  iconPlace = L.icon({
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



  @Input() activatedId: number
  @Input() removeId: number
  @Input() newMarker: Marker
  @Input() filteredArr: Marker[]
  constructor(private serviceHTTP: JsonService) { }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.activatedId){
      this.focusMarker(changes.activatedId.currentValue)
      this.blurMarker(changes.activatedId.previousValue)

    } else if(changes.removeId){
      this.removeMarker(changes.removeId.currentValue)

    } else if (changes.newMarker){

      this.map.on("click", e => {
        this.serviceHTTP.newMarker.coordinates = [e.latlng.lat, e.latlng.lng]
        this.addMarkers(this.serviceHTTP.newMarker)
        this.serviceHTTP.markerArr.push(this.serviceHTTP.newMarker)
        this.serviceHTTP.filter()
        this.map.off("click")

      })

    }  else if (changes.filteredArr){
      this.removeAllMarkers()
      this.serviceHTTP.filteredArr.forEach(el => this.addMarkers(el))
    }


  }

  ngAfterViewInit(): void {
    this.initMap()
    this.serviceHTTP.getMarkers().subscribe(data => {
      data.forEach(el => {
        const m = {...el, ...{active: false}}
        //this.addMarkers(m)
        this.serviceHTTP.markerArr.push(m)

      })
      console.log(this.serviceHTTP.markerArr)
      this.serviceHTTP.filter()
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
    if (id) {
      this.markers[id]._icon.classList.add('marker-active')
      this.map.panTo(this.markers[id].getLatLng())
    }
  }

  blurMarker(id: number) {
    if (id) {
      this.serviceHTTP.deactivatedMarker(id)
      this.markers[id]?._icon.classList.remove('marker-active')
    }
  }

  updateMarkers(el: Marker) {
    let icon
      switch (el.type) {
        case "Place":
          icon = this.iconPlace
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

  addMarkers(el: Marker){

    this.serviceHTTP.lastId = el.id
      let marker = this.updateMarkers(el)

    this.markers[marker.id] = L.marker(marker.coordinates, marker.options).addTo(this.map)
    this.markers[marker.id].on('click', e => {
      this.serviceHTTP.activatedMarker(+marker.id)
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
