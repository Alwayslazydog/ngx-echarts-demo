import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderCalcPercent'
})
export class GenderCalcPercentPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    if(args.length > 0){
      return (value/args[0]*100).toFixed(2).toString() +'%'
    }
    else {
      return '50%'
    }
  }

}
