import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { DashboardService } from './../../../services/dashboard.service';
import { Meters, MeterDetail, Consumption } from 'src/app/models/command-response';
import { map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-instantaneos-card',
  templateUrl: './instantaneos-card.component.html',
  styleUrls: ['./instantaneos-card.component.css']
})
export class InstantaneosCardComponent implements OnInit {
  private chart: am4charts.XYChart;

  public currentMonth = 'Noviembre';
  public dataSource: any;
  private meters: Meters;
  private instantaneos: Consumption[];
  public tableData: any[];
  summary: Consumption[];

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.getAll()
    .pipe(
      mergeMap(
        allmeters => {
          // return this.dashboardService.getConsumosInstantaneos(allmeters[0].id)
          return this.dashboardService.getDaily(allmeters[0].id)
          .pipe(
            map(
              instantaneos => {
                this.meters = allmeters;
                this.instantaneos = instantaneos;
              })
          )}
        )
      ).subscribe(
        () => {
          this.initXYChart();
          this.initTable();
          this.testSummary();

        }
      );
    
      
      

  }
  private testSummary() {
    this.dashboardService.getResumen(this.meters[0].id).subscribe(
      summary => {
        this.summary = summary;
      });
  }

  private initTable() {
    // Fase R	Fase S	Fase T	Total
    // Potencia activa				
    // Potencia reactiva				
    // Cos(fi)
    // this.instantaneos.

    this.tableData = [
      { none:'Potencia activa', fase_r: this.instantaneos[0].R.kwh , fase_s: this.instantaneos[0].S.kwh , fase_t: this.instantaneos[0].T.kwh, total:10},
      { none:'Potencia reactiva', fase_r: this.instantaneos[0].R.kvarh , fase_s: this.instantaneos[0].S.kvarh , fase_t: this.instantaneos[0].T.kvarh, total:10},
      { none:'Cos(fi)', fase_r: this.instantaneos[0].R.cosfi , fase_s: this.instantaneos[0].S.cosfi , fase_t: this.instantaneos[0].T.cosfi, total:10}
    ];
    
  }
  private initXYChart() {
    // Chart code goes in here
    // this.browserOnly(() => {
    this.gaugePotenciaActiva('gaugePotenciaActivaR','#E03997');
    this.gaugePotenciaActiva('gaugePotenciaActivaS','#00C3A5');
    this.gaugePotenciaActiva('gaugePotenciaActivaT','#FBBD09');


  }


  private gaugePotenciaActiva(tagId = 'gaugePotenciaActivaR',color = "#FBBD09", inst = null) {
    am4core.useTheme(am4themes_animated);
    const chart = am4core.create(tagId, am4charts.GaugeChart);
    chart.paddingRight = 20;
    chart.endAngle = -225;
    chart.startAngle = 45;
    chart.innerRadius = -5;

    const axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis.min = 0;
    axis.max = 10;
    axis.fixedWidthGrid = false;
    axis.strictMinMax = false;
    // axis.renderer.labels.template.radius = 20;
    axis.renderer.labels.template.adapter.add('text', function(text) {
      return '';
    });

    let baseRange = axis.axisRanges.create();
    baseRange.value = 0;
    baseRange.endValue = 10;
    baseRange.axisFill.fillOpacity = 1;
    baseRange.axisFill.fill = am4core.color("#EEEEEE");
    baseRange.axisFill.zIndex = -1;

    let range = axis.axisRanges.create();
    range.value = 4;
    range.endValue = 10;
    range.axisFill.fillOpacity = 1;
    range.axisFill.fill = am4core.color(color);
    range.axisFill.zIndex = -1;

    var label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 11;
    label.x = am4core.percent(50);
    label.y = am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.text = '228V\n' +
                  '293W\n' +
                  '\n'+ 
                  'General\n';

    this.chart = chart;
  }

  ngOnDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
  }

}
