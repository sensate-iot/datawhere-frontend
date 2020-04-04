import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {icon} from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public options: any;

  public constructor() {
    this.options = {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: ''
        })
      ],
      zoom: 6,
      center: L.latLng(51.59396, 4.4181)
    };

  }

  public ngOnInit(): void {
  }

  public onMapReady(map: any) {
    L.marker([52.377956, 4.897070], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'marker-icon.png',
        shadowUrl: ''
      })
    }).addTo(map)
      .bindPopup('The production environment in runs in Amsterdam.');
    L.marker([51.585663, 4.792149], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'marker-icon.png',
        shadowUrl: ''
      })
    }).addTo(map)
      .bindPopup('A secondary production environment and the test/staging environment is ' +
        'running at Avans University of Applied Sciences.');
  }
}
