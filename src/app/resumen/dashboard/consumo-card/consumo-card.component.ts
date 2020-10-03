import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { DashboardService } from './../../../services/dashboard.service';
import { Meters, MeterDetail, Consumption } from 'src/app/models/command-response';
import { zip } from 'rxjs';
import { flatMap, map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-consumo-card',
  templateUrl: './consumo-card.component.html',
  styleUrls: ['./consumo-card.component.css']
})
export class ConsumoCardComponent implements OnInit {
  private chart: am4charts.PieChart;
  public currentMonth = 'Noviembre';
  public currentYear = 2020;

  // Array(5)
	// 0:
	// 	R: {kwh: 123, kvarh: 123, cosfi: 0.71}
	// 	S: {kwh: 123, kvarh: 123, cosfi: 0.71}
	// 	T: {kwh: 123, kvarh: 123, cosfi: 0.71}
	// 		ano: 2020
	// 		mes: 8
	// 		__proto__: Object
	// 1:
	// 	ano: 2020
	// 	mes: 9
	// 	__proto__: Object
	// 2: {date: 10}
	// 3: {date: 11}
	// 4: {date: 12}
  private nombresFases = {"R": "General", "S": "Cocina", "T": "NC"}; //Esto no se sabe de donde sale

  private dataSource = new Array();
  public meters: Meters;
  public meter: MeterDetail;
  public monthly: any;
  public daily: Consumption[];

  constructor(@Inject(PLATFORM_ID) private platformId,
              private zone: NgZone,
              private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      am4core.useTheme(am4themes_animated);
      this.initChart();

  }

  private initChart(): void {
    this.dashboardService.getAll()
    .pipe(
      mergeMap(
        allmeters => {
          return this.dashboardService.getMonthly(allmeters[0].id)
          .pipe(
            map(
              monthly => {
                this.meters = allmeters;
                this.monthly = monthly;
              })
          )}
        )
      ).subscribe(
        () => {
          this.initPie();
        }
      );
  }

  private initPie() {
    this.chart = am4core.create('consumoChartdiv', am4charts.PieChart);

    this.formatResponse();
    this.chart.data = this.dataSource;

    const pieSeries = this.chart.series.push(new am4charts.PieSeries());

    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'key';
  }

  private formatResponse() {
    const monthly_acc = this.monthly.filter(x => x.R && x.S && x.T)
      .reduce((a, b) => { return { R: a.R + b.R, S: a.S + b.S, T: a.T + b.T }; });

    for (const key in monthly_acc) {
      if (key == 'R' || key == 'S' || key == 'T')
        this.dataSource.push({
          key: this.nombresFases[key],
          fase: key,
          value: monthly_acc[key].kwh
        });
    }
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    // this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    // });
  }


}
