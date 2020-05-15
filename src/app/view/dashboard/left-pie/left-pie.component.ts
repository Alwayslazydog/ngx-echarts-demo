import { Component, OnInit } from '@angular/core'
import { DashboardService } from '../../../api/dashboard.service'

@Component({
  selector: 'left-pie',
  templateUrl: './left-pie.component.html',
  styleUrls: ['./left-pie.component.scss']
})
export class LeftPieComponent implements OnInit {

  chartOption: any
  echartsIntance: any
  dataList = [] // 数据列表
  legendList = []
  options = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      data: this.legendList
    },
    series: [
      {
        name: '自助入住与前台接待占比',
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        top: 'top',
        left: 'left',
        data: this.dataList,
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              // color: 'rgba(255, 255, 255, 0.3)',
              normal: {
                color: (params) => {
                  //自定义颜色
                  return params.data.color
                },
              }
            }
          }
        },
        labelLine: {
          normal: {
            // lineStyle: {
            //   color: 'rgba(255, 255, 255, 0.3)'
            // },
            color: (params) => {
              //自定义颜色
              return params.data.color
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: (params) => {
              //自定义颜色
              return params.data.color
            },
            // shadowBlur: 0,
            // shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200
        }
      }
    ]
  }
  constructor(public dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getDataList()
  }

  computedPersent(num1,num2){ // 计算百分比
      return (num1/(num1 + num2)*100).toFixed(2).toString() +'%'
  }

  getDataList() {
    this.dashboardService.getGDCheckinDetail().subscribe(res => {
        
        this.dataList = [
          { value: res.data.autoCheckinNum, name: this.computedPersent(res.data.autoCheckinNum, res.data.receptionNum), color: '#50D5A9', type: '自助入住' },
          { value: res.data.receptionNum, name: this.computedPersent(res.data.receptionNum, res.data.autoCheckinNum), color: '#F57E7E', type: '前台接待' },
        ]
        
        this.legendList = this.dataList.map(item => {
          const data = {
            name: item.type,
            color: item.color
          }
          return data
        })
        this.setChartData()
    })
  }

  onChartInit(e: any) { // 初始化echarts instance
    this.echartsIntance = e
  }

  setChartData() {
    this.chartOption = this.options
    if (this.legendList.length) {
      this.chartOption.legend.data = this.legendList
    }
    this.chartOption.series.length && this.chartOption.series.forEach(item => {
      item.data = this.dataList
    })
    if (this.echartsIntance) {
      this.echartsIntance.clear()
      this.echartsIntance.setOption(this.chartOption, true)
    }
  }

}
