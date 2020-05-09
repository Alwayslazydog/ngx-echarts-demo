import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.baseUrl
  dataStatus = environment.status



  constructor(private http: HttpClient) { }
  
  /* 
  ** Http Headers
  */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  /**
   *  Error Handling
   */
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

  /*
  ** 获取获取广东省最近七天的入住
  ** Get Guangdong checkin data in latest 7 days
  */
  getCheckinCase(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `data/getCheckInCase`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  /*
  ** 获取获取广东省入住情况
  ** Get Guangdong checkin detail info
  */
  getGDCheckinDetail(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `data/getHousingDetailJoinInfo`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  /*
  ** 获取男女比例用户画像
  ** Get Guangdong checkin detail info
  */
  getScaleByGender(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `data1/getDataSex`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  
  /*
  ** 获取年龄段用户画像
  ** Get Guangdong checkin detail info
  */
  getScaleByAge(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `data1/getDataAge`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  
  /*
  ** 获取广东省近一年每月订单量数据
  ** Get Guangdong order data pre month nearly 12
  */
  getOrderByPreMonth(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `data/getOrderNum`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  
  /*
  ** 昨日广东省各市入住数据
  ** Get Guangdong check in  data yesterday
  */
  getCheckinByYesterday(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `data1/getDataCity`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  
  /*
  ** 近十二个月入住数据
  ** Get check in data by near 12 month
  */
  getCheckinByNearYear(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `data1/getDataHousing`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  
  /*
  ** 获取广东省各个城市的民宿数量
  ** Get GD housing number by cities
  */
  getHousingNumByCities(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `data/getHousingDetailNum`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  
  /*
  ** 获取数据总览
  ** Get GD housing number by cities
  */
  getOverView(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `data/getOverview`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }




}
