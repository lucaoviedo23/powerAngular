import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(public toastr: ToastrManager, public router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // localStorage.setItem('ngStorage-access_token', '');

    const token: string = localStorage.getItem('access_token');
    // const token: string = '94d647c5ff9beebd93897ee43b82edc658d64b9b';
    const urlLogin = 'http://api.testing.powermeter.com.ar/o/authorize/?response_type=code&client_id=RDhguCvOW4hVlI0T39tC9jY71Mp3lTOsKf7wAByC&redirect_uri='+ environment.clientUrl + '/callback/';

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    //  else {
    //   window.location.href = urlLogin;
    // }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    } else if (request.headers.get('Content-Type') === 'none') {
      request = request.clone({ headers: request.headers.delete('Content-Type') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('eventoo--->>>', event);
          // this.errorDialogService.openDialog(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('log', error);
        if (error.status === 401 || error.status === 403) {
          // handle authorization errors
          // in this example I am navigating to login.

          // this.router.navigate(['login']);
          window.location.href = urlLogin;
        }

        try {
          const data1 = {
            // tslint:disable-next-line:max-line-length
            reason: error && error.error.reason ? error.error.reason : (error.error.innerException.exceptionMessage ? error.error.innerException.exceptionMessage : ''),
            status: error.status
          };
          this.toastr.errorToastr(data1.status + ' ' + data1.reason, 'Service error');
          return throwError(error);
        }

        catch {
          const data = {
            reason: error && error.error.reason ? error.error.reason : (error.error.exceptionMessage ? error.error.exceptionMessage : ''),
            status: error.status
          };
          this.toastr.errorToastr(data.status + ' ' + data.reason, 'Service error');
          return throwError(error);
        }

      }));
  }
}



