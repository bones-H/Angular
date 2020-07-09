import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Marker} from '../interface';


@Injectable({providedIn: 'root'})

export class JsonService {
  markerArr: Marker[] = []
  activatedId = 0
  removeId = 0
  lastId = 0
  newMarker: Marker
  constructor(private http: HttpClient) {
  }

  getMarkers() {
    return this.http.get<Marker[]>('https://my-json-server.typicode.com/bones-H/myJson/markers')

  }

  activatedMarker(id: number) {
    this.markerArr.find(el => el.id === id).active = true
    this.activatedId = id
  }

  deactivatedMarker(id) {
    this.markerArr.find(el => el.id === id).active = false
  }
  removeMarker(marker){
    this.markerArr.splice(this.markerArr.indexOf(marker), 1)
    this.removeId = marker.id
  }
}
