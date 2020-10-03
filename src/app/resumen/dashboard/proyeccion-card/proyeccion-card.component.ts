import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { DashboardService } from 'src/app/services/dashboard.service';
import { mergeMap, map } from 'rxjs/operators';
import { Meters, Monthly, Consumption } from 'src/app/models/command-response';



@Component({
  selector: 'app-proyeccion-card',
  templateUrl: './proyeccion-card.component.html',
  styleUrls: ['./proyeccion-card.component.css']
})
export class ProyeccionCardComponent implements OnInit {
  private chart: am4charts.XYChart;

  public currentMonth = 'Noviembre';
  public dataSource: any;
  private meters: Meters;
  private daily: Consumption[];

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.getAll()
    .pipe(
      mergeMap(
        allmeters => {
          return this.dashboardService.getDaily(allmeters[0].id)
          .pipe(
            map(
              daily => {
                this.meters = allmeters;
                this.daily = daily;
              })
          )}
        )
      ).subscribe(
        () => {
          this.initXYChart();
        }
      );
  }
  private initXYChart() {
    // Chart code goes in here
    // this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      const chart = am4core.create('proyeccionChartdiv', am4charts.XYChart);

      chart.paddingRight = 20;

      const data = [];

      chart.data = this.daily.map( x => { 
        return {
         date: Date.parse(x.fecha),
         name:x.R,
         value: x.R?.kwh || 0
        } 
      });

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 20;

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';
      series.tooltipText = '{valueY.value}'+' kwh';
      series.strokeWidth = 4;
      series.fillOpacity = 0.5;

      let trend = chart.series.push(new am4charts.LineSeries());
      trend.dataFields.valueY = "value";
      trend.dataFields.dateX = "date";
      trend.strokeWidth = 1;
      trend.strokeDasharray = "3";
      trend.stroke = trend.fill = am4core.color("#c00");
      trend.data = data;
      
      
      




      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;
  }

  // Run the function only in the browser
  // browserOnly(f: () => void) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.zone.runOutsideAngular(() => {
  //       f();
  //     });
  //   }
  // }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    // this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    // });
    
  
  }
  
  

}
