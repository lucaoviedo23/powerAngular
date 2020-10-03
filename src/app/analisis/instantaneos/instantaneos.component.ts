import { Component, OnInit, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


@Component({
  selector: 'app-instantaneos',
  templateUrl: './instantaneos.component.html',
  styleUrls: ['./instantaneos.component.css']
})
export class InstantaneosComponent implements OnInit {

  private chart: am4charts.XYChart;


  public dataSource: any;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {
  }

  ngOnInit(): void {
  }

  // Run the function only in the browser
  // browserOnly(f: () => void) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.zone.runOutsideAngular(() => {
  //       f();
  //     });
  //   }
  // }

  ngAfterViewInit() {
    // Chart code goes in here
    // this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      const chart = am4core.create('proyeccionChartdiv', am4charts.XYChart);

      chart.paddingRight = 20;

      const data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: 'name' + i, value: visits });
      }

      chart.data = data;

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';
      series.tooltipText = '{valueY.value}';

      chart.cursor = new am4charts.XYCursor();

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    // });
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
