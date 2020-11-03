import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormatType } from '../models/format-type.enum';

@Pipe({ name: 'formatCustom' })
export class CustomFormatPipe implements PipeTransform {
  constructor(public datePipe: DatePipe, public trans: TranslateService) {}
  transform(value: any, typeData?: string): any {
    if (!value) {
      return '';
    }

    switch (typeData) {
      case FormatType.CURRENCY:
        const val: number = parseInt(value, 10);
        return val.toLocaleString();
      case FormatType.LOCAL_STRING:
        const val1: number = parseInt(
          value.toLocaleString().replace(/\D/g, ''),
          10
        );
        return isNaN(val1) ? '' : val1.toLocaleString();
      case FormatType.NUMBER:
        const numberV: number = parseInt(
          value.toLocaleString().replace(/\D/g, ''),
          10
        );
        return isNaN(numberV) ? '' : numberV;

      case FormatType.DATE:
        return this.datePipe.transform(value, FormatType.DATE);
      case FormatType.EXPORT_TYPE:
        return this.trans.instant('export-type.' + value);
      case FormatType.STATE:
        return this.trans.instant('states.' + value);
      default:
        return value;
    }
  }
}
