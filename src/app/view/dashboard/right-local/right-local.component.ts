import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../api/dashboard.service'

@Component({
  selector: 'app-right-local',
  templateUrl: './right-local.component.html',
  styleUrls: ['./right-local.component.scss']
})
export class RightLocalComponent implements OnInit {
  dataList = []
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
