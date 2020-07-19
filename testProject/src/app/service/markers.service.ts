import {Injectable} from '@angular/core';
import * as L from 'leaflet';

@Injectable({providedIn: 'root'})

export class MarkersService {

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


}
