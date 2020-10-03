import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.css']
})
export class BasicTableComponent implements OnInit {

  @Input() public data: any[] = [];

  public displayedColumns: string[];
  public dataSource:any;
  constructor() {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.displayedColumns = Object.getOwnPropertyNames(this.dataSource.data[0]).map(element => element.toLocaleUpperCase());
  }
}


