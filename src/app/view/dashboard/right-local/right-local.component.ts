import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../api/dashboard.service'

@Component({
  selector: 'app-right-local',
  templateUrl: './right-local.component.html',
  styleUrls: ['./right-local.component.scss']
})
export class RightLocalComponent implements OnInit {
  dataList = [
    { name: '深圳', value: '30202', rank: '1' },
    { name: '广州', value: '27621', rank: '-1' },
    { name: '汕头', value: '16233', rank: '' },
    { name: '湛江', value: '8862', rank: '5' },
    { name: '韶关', value: '5438', rank: '' },
    { name: '惠州', value: '5322', rank: '6' },
    { name: '东莞', value: '4266', rank: '' },
    { name: '珠海', value: '4028', rank: '' },
    { name: '潮州', value: '4019', rank: '-3' },
    { name: '河源', value: '3770', rank: '' }
  ]
  constructor(
    public dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
      this.initData()
  }
  initData(){
    this.dashboardService.getCheckinByYesterday().subscribe(res => {
          this.dataList = res.data.sort(this.compareValue("value"))
    })
  }
  compareValue(p){
      return (n, m) => {
          let a = n[p]
          let b = m[p]
          return b-a
      }
  }

}
