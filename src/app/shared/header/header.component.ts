import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  public redirectUrl = 'http://api.testing.powermeter.com.ar/o/authorize/?response_type=code&client_id=RDhguCvOW4hVlI0T39tC9jY71Mp3lTOsKf7wAByC&redirect_uri=' + environment.clientUrl + '/callback/'
  constructor() { }

  ngOnInit(): void {
  }

}
