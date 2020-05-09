import { Component, OnInit } from '@angular/core'
import { DashboardService } from '../../../api/dashboard.service'
import { forkJoin } from 'rxjs'

@Component({
  selector: 'app-right-user',
  templateUrl: './right-user.component.html',
  styleUrls: ['./right-user.component.scss']
})
export class RightUserComponent implements OnInit {
  genderData = []
    
  chartOption: any
  echartsIntance:any

  dataList = []
  options: Object = {}
  constructor(
    public dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.initDataList()
  }
  initDataList() {
    forkJoin(this.dashboardService.getScaleByAge(), this.dashboardService.getScaleByGender()).subscribe((res) => {
          
          if(res[0].data.length){
              this.dataList = res[0].data.map(item => {
                  item.value = parseInt(item.value)
                  return item
              })
          }

          if(res[1].data.length){
            this.genderData =  res[1].data.map(item => {
              if(parseInt(item.type) == 1)
                item.type = '男性'
                else 
                item.type = '女性'
                item.value = parseInt(item.value)
              return item
            })
          }

          this.initPie()
    })
  }
  
  onChartInit(ec: any) { //初始化echarts
    this.echartsIntance = ec;
  }

  setChartData(){ // 插入数据 并重载画布
    this.chartOption = this.options;
    this.chartOption.series.length&&this.chartOption.series.forEach(item => {
         item.data =  this.dataList;
         
    });
    if (this.echartsIntance) {
      this.echartsIntance.clear();
      this.echartsIntance.setOption(this.chartOption, true);
    }
  }
  initPie() {
    this.options = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend:{
        type:'plain',
        show: true,
        orient: 'vertical',
        align: 'left',
        left: '10%',
        bottom: '25%',
        itemWidth: 8,
        itemHeight: 8,
        icon: 'circle',
        textStyle: {
          color:['#F57E7E', '#FFB647', '#50D5A9', '#2D99FF', '#4766FF']
        }
      },
      // visualMap: {
      //   show: false,
      //   min: 334,
      //   max: 1790,
      //   inRange: {
      //     color: ['#F57E7E', '#FFB647', '#50D5A9', '#2D99FF', '#4766FF']
      //   }
      // },
      series: [
        {
          name: '入住用户',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: this.dataList,
          roseType: 'radius',
          left: '30%',
          label: {
            normal: {
              textStyle: {
                // color: 'rgba(255, 255, 255, 0.3)',
                normal: {
                  color: (params) => {
                    //自定义颜色
                    let colorList = [
                      '#F57E7E', '#FFB647', '#50D5A9', '#2D99FF', '#4766FF'
                    ]
                    return colorList[params.dataIndex]
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
                let colorList = [
                  '#F57E7E', '#FFB647', '#50D5A9', '#2D99FF', '#4766FF'
                ]
                return colorList[params.dataIndex]
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            color:(params)=> {
              //自定义颜色
              let colorList = [          
                    '#F57E7E','#FFB647','#50D5A9','#2D99FF','#4766FF'
                  ];
                  return colorList[params.dataIndex]
            },
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200
          }
        }
      ]
    }
  }

}
