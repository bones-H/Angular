import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Marker} from '../interface';
import * as L from 'leaflet';
import {Subscription} from 'rxjs';
import {MapService} from './map.service';
import {PaginationService} from './pagination.service';

@Injectable({providedIn: 'root'})
export class MarkerService {
  markers = {};
  markerArr: Marker[] = [];
  filteredArr: Marker[] = [];

  activatedId = null;
  lastId = null;

  searchTitle = '';
  filterType = '';

  subscription: Subscription;
  error = '';

  constructor(private http: HttpClient,
              public paginationService: PaginationService,
              public mapService: MapService) {
  }

  getMarkers() {
    this.subscription = this.http
      .get<Marker[]>(
        'https://my-json-server.typicode.com/bones-H/myJson/markers'
      )
      .subscribe((data) => {
        data.forEach((el) => {
          const marker = {...el, ...{active: false}};
          this.markerArr.push(marker);
          this.lastId = el.id;
        });
        this.filterMarkers();

        this.subscription.unsubscribe();
      }, error => this.error = error.message);
  }

  placeMarker(newMarker) {
    document.getElementById('map').classList.add('cursor');
    this.mapService.map.on('click', (e) => {
      newMarker.coordinates = [e.latlng.lat, e.latlng.lng];
      this.addMarkerOnMap(newMarker);
      this.markerArr.push(newMarker);
      this.filterMarkers();
      this.mapService.map.off('click');
      document.getElementById('map').classList.remove('cursor');
    });
  }

  addMarkerOnMap(el: Marker) {
    let marker = this.mapService.modifyMarkers(el);
    this.markers[marker.id] = L.marker(
      marker.coordinates,
      marker.options
    ).addTo(this.mapService.map);
    this.markers[marker.id].on('click', (e) => {
      this.focusMarker(+marker.id);
    });
  }

  focusMarker(id: number) {
    if (id) {
      this.blurMarker(this.activatedId);
      const marker = this.filteredArr.find((el) => el.id === id);
      if (marker) {
        marker.active = true;
        this.activatedId = id;
      }
      this.markers[id]._icon.classList.add('marker-active');
      this.mapService.map.panTo(this.markers[id].getLatLng());
      const index = this.filteredArr.indexOf(marker);
      this.paginationService.findPage(index);
    }
  }

  blurMarker(id: number) {
    if (id) {
      const marker = this.markerArr.find((el) => el.id === id);
      marker.active = false;
      this.markers[id]?._icon.classList.remove('marker-active');
      this.activatedId = 0;
    }
  }

  removeMarker(marker) {
    this.blurMarker(this.activatedId);
    this.markerArr.splice(this.markerArr.indexOf(marker), 1);
    this.filterMarkers();
  }

  filterMarkers() {
    const regexpType = new RegExp(this.filterType, 'i');
    this.filteredArr = this.markerArr.filter((el) => regexpType.test(el.type));
    if (this.searchTitle) {
      const regexpTitle = new RegExp(this.searchTitle, 'i');
      this.filteredArr = this.filteredArr.filter((el) =>
        regexpTitle.test(el.title)
      );
    }
    for (let key in this.markers) {
      if (!this.filteredArr.find(marker => marker.id === +key)) {
        this.markers[key].removeFrom(this.mapService.map);
        delete this.markers[key];
      }
    }
    this.filteredArr.forEach((el) => {
      if (!this.markers[el.id]) {
        this.addMarkerOnMap(el);
      }
    });
    this.paginationService.getPagination(this.filteredArr);
  }
}
