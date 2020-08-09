import {Injectable, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {Marker} from '../interface';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  map;
  iconPlace = L.icon({
    iconUrl: 'https://svgsilh.com/svg/1093167-ff5722.svg',
    iconSize: [50, 50],
  });
  iconEvent = L.icon({
    iconUrl: 'https://svgsilh.com/svg/1915456-ff5722.svg',
    iconSize: [50, 50],
  });
  iconDefault = L.icon({
    iconUrl: 'https://svgsilh.com/svg/1566741.svg',
    iconSize: [50, 50],
  });

  constructor() {
  }


  initMap(): void {
    this.map = L.map('map', {
      center: [59.9310584, 30.3609096],
      zoom: 10,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    return this.map;
  }

  modifyMarkers(el: Marker) {
    let icon;
    switch (el.type) {
      case 'Place':
        icon = this.iconPlace;
        break;
      case 'Event':
        icon = this.iconEvent;
        break;
      default:
        icon = this.iconDefault;
    }
    const marker = {
      ...el,
      ...{
        options: {
          title: el.title,
          icon: icon,
        },
      },
    };
    return marker;
  }

}
