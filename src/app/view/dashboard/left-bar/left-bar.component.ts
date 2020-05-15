import { Component, OnInit } from '@angular/core'
import { DashboardService } from '../../../api/dashboard.service'

@Component({
  selector: 'left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {
  
  initOpts = {
    renderer: 'svg',
    width: 480,
    height: 240
  }
  chartOption: any
  echartsIntance:any
  dataList:Array<any>
  options = {
    color: ['#3AB8A7'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [],
        axisLabel: {
          color: '#B8FFF5'
        },
        axisLine: {
          lineStyle: {
          }    // x轴坐标轴颜色
        },
        axisTick: {
          show: false,
          // alignWithLabel: true
        },
      }
    ],
    yAxis: [{
      type: 'value',
      axisLabel: {
        color: '#B8FFF5'
      },
      axisLine: {
        lineStyle: {
        }    // x轴坐标轴颜色
      },
      axisTick: {
        show: false,
        // alignWithLabel: true
      },

      splitArea : {show : false},  //去除网格区域
 
      splitLine:{show: false},
    }],
    series: [{
      name: 'Counters',
      type: 'bar',
      barWidth: '50%',
      data: this.dataList
    },
    {
      name: '入住人数',
      type: 'line',
      stack: 'checkin',
      smooth:true,
      color: '#44D7C3',
      silent: true,
      zlevel: 1,
      areaStyle: {
        normal: {
          color: '#44D7C3'
        },
      },
      itemStyle:{
        opacity: 0
      },
      lineStyle: {
        color: '#44D7C3',
        width: 2,
        // opacity:0.5
      },
      data: this.dataList
    }]
  }
  constructor(
    public dashboardService: DashboardService
  ) { }

  onChartInit(ec: any) {
    this.echartsIntance = ec;
  }
  ngOnInit(): void {
    this.getDataList()
  }
  getDataList(){
    // this.dataList = [28, 16, 33, 70, 100, 40, 30, 28, 16, 33, 70, 100]
    this.dashboardService.getOrderByPreMonth().subscribe(res => {
        this.dataList = res.data
        this.setChartData()
    })
    this.initDateArr()
  }
  initDateArr(){
    let month = new Date().getMonth()
    month = month > 1 ? month - 1 : 12
    let [arr, result] = [['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],[]]
    result.push(arr[month])
    for (let i = 0; i < arr.length - 1 ; i++) {
      if(month - 1 >= 0){
          month = month - 1
          result.unshift(arr[month])
      } else {
          month = 11
          result.unshift(arr[month])
      }
      if(i == arr.length - 2 ){
        this.options.xAxis[0].data = result
      }
    }
  }
  setChartData(){
    this.chartOption = this.options;
    this.chartOption.series.forEach(item => {
         item.data =  this.dataList;
         console.log(item)
    });
    if (this.echartsIntance) {
      this.echartsIntance.clear();
      this.echartsIntance.setOption(this.chartOption, true);
    }
  }
}
