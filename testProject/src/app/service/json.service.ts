import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Marker} from '../interface';

@Injectable({providedIn: 'root'})

export class JsonService {
  markerArr: Marker[] = []

  constructor(private http: HttpClient) {
  }

  getMarkers() {
    return this.http.get<Marker[]>('https://my-json-server.typicode.com/bones-H/myJson/markers')

  }


}
