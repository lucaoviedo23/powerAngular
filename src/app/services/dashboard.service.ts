import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommandResponse, MeterDetail, Meters, Consumption, Monthly } from '../models/command-response';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = `${environment.apiServiceBaseUri}/meters`;

  constructor(private http: HttpClient) {
   }

  public getAll(): Observable<Meters> {
    return this.http.get<Meters>(`${this.url}/electric`);
  }

  public getByMeterId(meterId: number): Observable<MeterDetail> {
    return this.http.get<MeterDetail>(`${this.url}/electric/${meterId}`);
  }

// meters/electric/<int:pk>/energy/monthly
//   Consumos mensuales. Por defecto viene el año actual.
//  Parámetros:
// year: año con número completo. ej: 2020   //UNKNOWN RESPONSE TYPE HERE!
  public getMonthly(meterId?: number): Observable<Monthly[]> {
    return this.http.get<Monthly[]>(`${this.url}/electric/${meterId}/energy/monthly`);
  }

// meters/electric/<int:pk>/energy/daily
// Consumos diarios, por defecto viene un mes
// Parámetros:
// year: año completo. ej 2020
// month: número del mes
public getDaily(meterId: number): Observable<Consumption[]> {
  return this.http.get<Consumption[]>(`${this.url}/electric/${meterId}/energy/daily`);
}




public getConsumosInstantaneos(meterId: number): Observable<any> {
  return this.http.get<any>(`${environment.apiServiceBaseUri}meters/electric/${meterId}/energy/instant`);
}

//medidores/<int:pk>/resumen
// /meters/electric/1/summary/
public getResumen(misterio: number) : Observable<any> {
  return this.http.get<any>(`${environment.apiServiceBaseUri}meters/electric/${misterio}/summary`);
}






}
