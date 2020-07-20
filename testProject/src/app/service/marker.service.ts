import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marker } from '../interface';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MarkerService {
  markerArr: Marker[] = [];
  filteredArr: Marker[] = [];
  activatedId = null;
  removeId = null;
  lastId = null;
  newMarker: Marker;
  searchTitle = '';
  filterType = '';
  subscription: Subscription;
  error = '';

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

  constructor(private http: HttpClient) {}

  getMarkers() {
    this.subscription = this.http
      .get<Marker[]>(
        'https://my-json-server.typicode.com/bones-H/myJson/markers'
      )
      .subscribe((data) => {
        data.forEach((el) => {
          const marker = { ...el, ...{ active: false } };
          this.markerArr.push(marker);
          this.lastId = el.id;
        });
        this.filterMarkers();
        this.subscription.unsubscribe();
      }, error => this.error = error.message);
  }
  updateMarkers(el: Marker) {
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

  activateMarker(id: number) {
    const marker = this.filteredArr.find((el) => el.id === id);
    if (marker) {
      marker.active = true;
      this.activatedId = id;
    }
  }

  deactivateMarker(id) {
    const marker = this.markerArr.find((el) => el.id === id);
    if (marker) {
      marker.active = false;
    }
  }

  removeMarker(marker) {
    this.markerArr.splice(this.markerArr.indexOf(marker), 1);
    this.removeId = marker.id;
    this.filterMarkers();
  }
  filterMarkers(str?: string) {
    if (str != undefined) {
      this.filterType = str;
    }
    const regexpType = new RegExp(this.filterType, 'i');
    this.filteredArr = this.markerArr.filter((el) => regexpType.test(el.type));
    if (this.searchTitle) {
      const regexpTitle = new RegExp(this.searchTitle, 'i');
      this.filteredArr = this.filteredArr.filter((el) =>
        regexpTitle.test(el.title)
      );
    }
  }
}
