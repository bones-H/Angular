import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Marker} from '../interface';


@Injectable({providedIn: 'root'})

export class JsonService {
  markerArr: Marker[] = []
  filteredArr: Marker[] = []
  activatedId = null
  removeId = null
  lastId = null
  newMarker: Marker
  search = ''
  constructor(private http: HttpClient) {
  }

  getMarkers() {
    return this.http.get<Marker[]>('https://my-json-server.typicode.com/bones-H/myJson/markers')

  }

  activatedMarker(id: number) {
    let marker = this.filteredArr.find(el => el.id === id)
    if (marker) {
      marker.active = true
      this.activatedId = id
    }
  }

  deactivatedMarker(id) {
    let marker = this.markerArr.find(el => el.id === id)
    if (marker) {
      marker.active = false
      // this.activatedId = 0
    }
  }

  removeMarker(marker){
    this.markerArr.splice(this.markerArr.indexOf(marker), 1)
    this.removeId = marker.id
    this.filter()
  }
  filter(){
    let regexp = new RegExp(this.search, 'i');
    this.filteredArr = this.markerArr.filter(el => regexp.test(el.type));
  }
}
