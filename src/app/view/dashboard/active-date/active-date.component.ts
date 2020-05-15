import { Component, OnInit } from '@angular/core';
import { DashboardService} from '../../../api/dashboard.service'
@Component({
  selector: 'app-active-date',
  templateUrl: './active-date.component.html',
  styleUrls: ['./active-date.component.scss']
})
export class ActiveDateComponent implements OnInit {
  
  dataList: Array<any>
  chartOption: any
  echartsIntance: any
  year: Array<any>
  options = {
      tooltip: {},
      visualMap: {
          min: 0,
          max: 50000,
          maxOpen: true,
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          top: 20,
          textStyle: {
              color: '#B8FFF5'
          }
      },
      grid:{
        height:240,
        top: 0
      },
      calendar: {
          top: 80,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          // range: this.year,
          range: '2020',
          itemStyle: {
              borderWidth: 0.5,
              color: '#F5E8A6'
          },
          yearLabel: {show: false},
          monthLabel: {
            color: '#B8FFF5',
            nameMap: 'cn',
            position: 'end',
            fontSize: 10
          },
          dayLabel:{
            nameMap: 'cn',
            color:'#B8FFF5',
            fontSize: 10
          }
      },
      series: [{
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: []
      }]
  };
  constructor(
    public dashBoardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getDataList()
  }

  getDataList(){
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()
    if(month == 12){
      this.year = [year + '-' + '01', year + '-' + month + '-'  + day]
    } else {
      this.year = [year - 1 + '-' + (month + 1) , year + '-' + month + '-'  + day]
    }
    this.dashBoardService.getCheckinByNearYear().subscribe(res => {
        this.dataList = res.data
        
        this.setChartData()
    })
  }
  
  onChartInit(ec: any) { //初始化echarts
    this.echartsIntance = ec;
  }

  setChartData(){ // 插入数据 并重载画布
    this.chartOption = this.options;
    this.chartOption.series[0].data = this.dataList
    this.chartOption.calendar.range = this.year
    if (this.echartsIntance) {
      this.echartsIntance.clear();
      this.echartsIntance.setOption(this.chartOption, true);
    }
  }

}
