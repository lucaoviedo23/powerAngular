import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  public title = 'My first AGM project';
  public lat = 51.678418;
  public lng = 7.809007;

  constructor() { }

  ngOnInit(): void {
  }

}
