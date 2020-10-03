import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ErrorDialogComponent } from './interceptor/errordialog.component';
import { ResumenComponent } from './resumen/resumen.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { AuditorComponent } from './auditor/auditor.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { ControlComponent } from './control/control.component';
import { DashboardComponent } from './resumen/dashboard/dashboard.component';
import { MapaComponent } from './resumen/mapa/mapa.component';
import { PlantaComponent } from './resumen/planta/planta.component';
import { InstantaneosComponent } from './analisis/instantaneos/instantaneos.component';
import { HistoricosComponent } from './analisis/historicos/historicos.component';
import { CalidadComponent } from './analisis/calidad/calidad.component';
import { StandByComponent } from './analisis/stand-by/stand-by.component';
import { EventosComponent } from './analisis/eventos/eventos.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { SuiModule } from 'ng2-semantic-ui';
import { SubheaderComponent } from './shared/subheader/subheader.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultComponent } from './default/default.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SidenavService } from './services/sidenav.service';
import { ProyeccionCardComponent } from './resumen/dashboard/proyeccion-card/proyeccion-card.component';
import { ConsumoCardComponent } from './resumen/dashboard/consumo-card/consumo-card.component';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule  } from '@angular/material/table';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { BasicTableComponent } from './shared/basic-table/basic-table.component';
import { SemanalCardComponent } from './resumen/dashboard/semanal-card/semanal-card.component';
import { InstantaneosCardComponent } from './resumen/dashboard/instantaneos-card/instantaneos-card.component';



@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    ResumenComponent,
    FacturacionComponent,
    AuditorComponent,
    AnalisisComponent,
    ControlComponent,
    DashboardComponent,
    MapaComponent,
    PlantaComponent,
    InstantaneosComponent,
    HistoricosComponent,
    CalidadComponent,
    StandByComponent,
    EventosComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    SubheaderComponent,
    LoginComponent,
    DefaultComponent,
    ProyeccionCardComponent,
    ConsumoCardComponent,
    BasicTableComponent,
    SemanalCardComponent,
    InstantaneosCardComponent
  ],
  imports: [
    BrowserModule,
    SuiModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'mapa', component: MapaComponent },
      { path: 'planta', component: PlantaComponent },
      { path: 'login', component: LoginComponent },
      { path: 'analisis', component: AnalisisComponent },
      { path: 'instantaneas', component: InstantaneosComponent },
      { path: 'auditor', component: AuditorComponent },
      { path: 'facturacion', component: FacturacionComponent },
      { path: 'resumen', component: ResumenComponent },
      { path: 'standby', component: StandByComponent },
      { path: 'callback',component: LoginComponent },
    ]),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDDWvAXG9wEM-iOAgSmAan2fStp0BQGcDc'
    })
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    SidenavService,
     { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true,  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
