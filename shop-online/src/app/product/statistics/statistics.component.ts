import {Component, OnInit} from '@angular/core';
import * as Chart from 'chart.js'
import {OrderService} from "../../service/order.service";
import {Statistics} from "../../model/statistics";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public canvas: any;
  public ctx: any;
  public labelsW: string[]= [];
  public dataCasesW: number[] = [];
  public labelsM: string[]= [];
  public dataCasesM: number[] = [];
  public labelsY: string[]= [];
  public dataCasesY: number[] = [];
  statisticWeek: Statistics[] = [];
  statisticMonth: Statistics[] = [];
  statisticYear: Statistics[] = [];

  constructor(private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.getStatisticsWeek()
    this.getStatisticsMonth()
    this.getStatisticsYear()
    this.createLineChartWeek()
    this.createLineChartMonth()
    this.createLineChartYear()
  }

  getStatisticsWeek(){
    this.orderService.getStatisticsWeek().subscribe((data : Statistics[]) =>{
      this.statisticWeek = data;
      for (let i = 0; i < data.length ; i++) {
        this.labelsW.push(data[i].name)
        this.dataCasesW.push(data[i].quantity)
      }
    })
  }
  getStatisticsMonth(){
    this.orderService.getStatisticsMonth().subscribe((data : Statistics[]) =>{
      this.statisticMonth = data;
      for (let i = 0; i < data.length ; i++) {
        this.labelsM.push(data[i].name)
        this.dataCasesM.push(data[i].quantity)
      }
    })
  }
  getStatisticsYear(){
    this.orderService.getStatisticsYear().subscribe((data : Statistics[]) =>{
      this.statisticYear = data;
      for (let i = 0; i < data.length ; i++) {
        this.labelsY.push(data[i].name)
        this.dataCasesY.push(data[i].quantity)
      }
    })
  }

  private createLineChartWeek() {
    this.canvas = document.getElementById('myChartW');
    this.ctx = this.canvas.getContext('2d');

    let chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.labelsW,
        datasets: [{
          label: "Tuần",
          data: this.dataCasesW,
          backgroundColor: '#ffbb33',
          borderColor: '#ffbb33',
          fill: false,
          borderWidth: 0
        }]
      },
      options: {
        title: {
          display: true,
          text: ""
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },

      }
    });
  }
  private createLineChartMonth() {
    this.canvas = document.getElementById('myChartM');
    this.ctx = this.canvas.getContext('2d');

    let chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.labelsM,
        datasets: [{
          label: "Tháng",
          data: this.dataCasesM,
          backgroundColor: '#ff0000',
          borderColor: '#ff0000',
          fill: false,
          borderWidth: 2
        }]
      },
      options: {
        title: {
          display: true,
          text: ""
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },

      }
    });
  }
  private createLineChartYear() {
    this.canvas = document.getElementById('myChartY');
    this.ctx = this.canvas.getContext('2d');

    let chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.labelsY,
        datasets: [{
          label: "Năm",
          data: this.dataCasesY,
          backgroundColor: '#003fff',
          borderColor: '#003fff',
          fill: false,
          borderWidth: 2
        }]
      },
      options: {
        title: {
          display: true,
          text: ""
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },

      }
    });
  }
}
