import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import * as echarts from 'echarts'
import { DashboardService } from '../../../api/dashboard.service'


@Component({
  selector: 'mid-map',
  templateUrl: './mid-map.component.html',
  styleUrls: ['./mid-map.component.scss']
})
export class MidMapComponent implements OnInit {
  public nowTime: Date = new Date()
  mapLoaded = true
  options = {}
  dashData = []
  chartOption: any
  echartsIntance:any
  dataList: Array<any>

  constructor(
    private http: HttpClient,
    public dashboardService: DashboardService
    ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.nowTime = new Date()
    }, 1000)
    this.listInit()
  }

  listInit(){
      // this.dashData = [
      //     {
      //       name: '民宿总数',
      //       value: 2000,
      //       icon: 'house'
      //     },{
      //       name: '房间总数',
      //       value: 3846,
      //       icon: 'room'
      //     },{
      //       name: '智能门锁总数',
      //       value: 2670,
      //       icon: 'door'
      //     }
      // ]
      this.dashboardService.getOverView().subscribe(res => {
          this.dashData = res.data
      })
      this.dashboardService.getHousingNumByCities().subscribe(res => {
          this.dataList = res.data.map(item => {
             item.selected = item.selected == 1 ? true : false
             return item
          })
          this.mapInit()
      })
  }
  mapInit() {
    // 获取广东地图的json文件
    this.http.get('assets/data/guangdong.json').subscribe(geoJson => {
      echarts.registerMap('广东', geoJson)
      this.options = {
        visualMap: [
          { // 第一个 visualMap 组件
            type: 'continuous', // 定义为连续型 visualMap
            id:'guangdongMap',
            dimension: 0,
            max: 32000,
            min: 0,
            calculable: true,
            align: 'right',
            itemWidth: 16,
            itemHeight: 96,
            right: 78,
            bottom: 0,
            textStyle: {
              color: '#B8FFF5',
              fontSize: 10
            },
            target: {
              inRange: {
                color: ['#08242E', '#3FAEA8'],
                symbolSize: [0, 4000],
              }
            },
            inRange: {
              color: ['#08242E', '#3FAEA8'],
            }

          }
        ],
        series: [
          {
            // name: '广东',
            type: 'map',
            mapType: '广东',
            roam: false,
            aspectScale: 1.13,
            zoom: 1,
            layoutCenter:'bottom',
            // top:'1%',
            // layoutCenter: 100,,
            nameMap: {
              selectedMode: 'single',
            },
            data: this.dataList,
            label: {
              normal: {
                show: false,
                color: '#45F5E6'
              },
              emphasis: {
                show: true,
                color: '#4FD6CA',
                position:  'insideTop',
                distance: 50,

                height:150,
                width: 30,
                zlevel:999,
                z:999,
                fontSize:12,
                fontFamily:['HiraginoSansGB-W6','Hiragino'],
                formatter:(params)=> {
                    return params.name + ' ' + (params.value || 0) +'家' + '\n\n{img|}'
                },
                rich: {
                  img: {
                    height: 70,
                    width: 30,
                    align: 'center',
                    backgroundColor: {
                      image: 'assets/icon/map-mark.png'
                    }
                  }
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#4FD6CA',
                borderWidth: 2,
                areaColor: '#08242E'
              },
              emphasis: {
                areaColor: '#4FD6CA'
              }
            }
          }
        ]
      }
      this.setChartData()
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

}
