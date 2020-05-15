import { Component, OnInit } from '@angular/core'
import { DashboardService } from '../../../api/dashboard.service'

@Component({
  selector: 'left-curve',
  templateUrl: './left-curve.component.html',
  styleUrls: ['./left-curve.component.scss']
})
export class LeftCurveComponent implements OnInit {
  isLoading = false
  loadingOpts = {
    text: '数据加载中',
    color: '#00bdfc',
    textColor: '#ff0000',
    maskColor: 'rgba(255, 255, 255, 0.6)',
    zlevel: 0
  }

  dataList: Array<any>
  chartOption: any
  echartsIntance:any
  
  options = {
    tooltip: {
      trigger: 'axis',
      normal: {
        color: '#B8FFF5'
      },
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
          color: '#B8FFF5'
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: '#B8FFF5'
        },
        axisLine: {
        },
        axisTick: {
          show: false
        },
        splitArea : {show : false},  //去除网格区域
 
        splitLine:{show: false},
      },
    ],
    series: [
      {
        name: '',
        type: 'line',
        stack: 'auth',
        color: '',
        silent: true,
        zlevel:2,
        areaStyle: {
          normal: {
          }
        },
        lineStyle: {
          color: '',
          width: 2,
          // opacity:0.5
        },
        itemStyle:{
          opacity: .3
        },
        smooth:true,
        data: [],
      },
      {
        name: '',
        type: 'line',
        stack: 'checkin',
        smooth:true,
        color: '',
        silent: true,
        zlevel: 1,
        areaStyle: {
          normal: {
          },
        },
        itemStyle:{
          opacity: .3
        },
        lineStyle: {
          color: '',
          width: 2,
          // opacity:0.5
        },
        data: []
      }
    ]
  }
  constructor(
    public dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.initDateArr()
  }
  initDateArr(){
    let week = new Date().getDay()
    let [arr, result] = [['周日','周一','周二','周三','周四','周五','周六'],[]]
    for (let i = 0; i < arr.length - 1 ; i++) {
      if(week - 1 >= 0){
          week = week - 1
          result.unshift(arr[week])
      } else {
          week = 6
          result.unshift(arr[week])
      }
      if(i == arr.length - 2 ){
        result.push('今天')
        this.options.xAxis[0].data = result
      }
    }
    this.getDataList()
  }
  getDataList(){
      this.dashboardService.getCheckinCase().subscribe( res => {
        this.dataList = [
          {
            name: '认证人数',
            color: '#F57E7E',
            data: res.data.authPeopleNums
          },
          {
            name: '入住人数',
            color: '#44D7C3',
            data: res.data.checkInPeopleNums
          }
        ]
        
        this.setChartData()
      })
  }

  onChartInit(ec: any) { //初始化echarts
    this.echartsIntance = ec;
  }

  setChartData(){ // 插入数据 并重载画布
    this.chartOption = this.options;
    this.chartOption.series.length&&this.chartOption.series.forEach((item,idx) => {
         item.data =  this.dataList[idx].data;
         item.name = this.dataList[idx].name
         item.areaStyle.color = this.dataList[idx].color
         item.color = this.dataList[idx].color
         item.lineStyle.color = this.dataList[idx].color
    });
    if (this.echartsIntance) {
      this.echartsIntance.clear();
      this.echartsIntance.setOption(this.chartOption, true);
    }
  }

}
