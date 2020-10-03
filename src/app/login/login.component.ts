import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  oauthResponse: any;
  accessToken = 'none';

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.code) {
          this.getAccessToken(params.code);
      }
    });
  }

  goToLoginPage(): void {
      const params = [
          'response_type=code',
          'client_id=RDhguCvOW4hVlI0T39tC9jY71Mp3lTOsKf7wAByC',
          encodeURIComponent('redirect_uri='+ environment.clientUrl + '/callback/'),
      ];
      window.location.href = environment.clientUrl + '/o/authorize?' + params.join('&');
  }

  getAccessToken(code: string): void {
    const payload = new HttpParams()
        .append('grant_type', 'authorization_code')
        .append('code', code)
        .append('redirect_uri', environment.clientUrl + '/callback/')
        .append('client_id', 'RDhguCvOW4hVlI0T39tC9jY71Mp3lTOsKf7wAByC');
    this.http.post('http://api.testing.powermeter.com.ar/o/token/', payload, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).subscribe(response => {
        this.oauthResponse = response;
        this.accessToken = this.oauthResponse.access_token;
        localStorage.setItem('access_token', this.accessToken);
    });
  }


}
