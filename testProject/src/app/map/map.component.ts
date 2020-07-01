import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {JsonService} from '../service/json.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{
  private map
  url = ''
  iconLocation = L.icon({
    iconUrl: 'https://svgsilh.com/svg/1093167-ff5722.svg',
    iconSize: [50, 50]
  })
  iconEvent = L.icon({
    iconUrl: 'https://svgsilh.com/svg/1915456-ff5722.svg',
    iconSize: [50, 50]
  })
  markerData = [{
    coordinates: [59.9310584, 30.3609096 ],
    options: {
      title: "Location1",
      draggable: true,
      icon: this.iconLocation
    }
  },
    {
      coordinates: [59.94, 30.37 ],
      options: {
        title: "Location2",
        clickable: true,
        draggable: true,
        icon: this.iconEvent
      }
    }]
  constructor(private serviceHTTP: JsonService) { }

  ngAfterViewInit(): void {
    this.initMap()
    this.serviceHTTP.getMarkers()
      .subscribe(data => this.serviceHTTP.markerArr.push(...data))
    console.log(this.serviceHTTP.markerArr)
    this.updateMarkers()
    console.log(this.markerData)
    this.markerData.forEach(el => L.marker(el.coordinates, el.options).addTo(this.map))
  }

  private initMap(): void {

    this.map = L.map('map', {
      center: [ 59.9310584, 30.3609096 ],
      zoom: 10
    });
    let iconDef = L.icon({
      iconUrl: 'https://svgsilh.com/svg/1093169-3f51b5.svg',
      iconSize: [50, 50]
    })
    let iconAct = L.icon({
      iconUrl: 'https://svgsilh.com/svg/1093169-ff5722.svg',
      iconSize: [50, 50]
    })




    let markerOptions = {
      title: "MyLocation",
      clickable: true,
      draggable: true,
      icon: iconAct
    }

    // let marker = L.marker([59.9310584, 30.3609096 ], markerOptions)
    // let marker1 = L.marker([59.9310584, 30.37 ], markerOptions)

   // marker.on('click', () => marker.setIcon(iconAct))
    //marker1.on('click', () => marker1.setIcon(iconAct))

    // marker.addTo(this.map)
    // marker1.addTo(this.map)
    // marker.on('click', getIcon(iconAct))
    // L.popup()
    //   .setLatLng([59.9310584, 30.3609096 ])
    //   .setContent("I am a standalone popup.")
    //   .openOn(this.map);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }


  focusMarker($event: any) {

    if ($event.target.classList.contains('leaflet-marker-icon')){
      //$event.target.style.filter = 'invert(120%)'
      $event.target.classList.add('marker-active')

    }
  }

  blurMarker($event: any) {
    //$event.target.style.filter = 'invert(0%)'
    $event.target.classList.remove('marker-active')
    console.log('blur')
  }

  updateMarkers() {
    this.serviceHTTP.markerArr.forEach(el => {
      console.log(el)
      // const marker = Object.assign({options: {
      //     title: el.title,
      //     icon: this.iconLocation
      //   }}, el)
      const marker = Object.assign({options: 1}, el)
      console.log(marker)
      //this.markerData.push(...marker)
    })
  }
}
