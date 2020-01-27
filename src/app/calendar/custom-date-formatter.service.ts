import { Injectable } from '@angular/core';
import { DateFormatterParams, CalendarDateFormatter } from 'angular-calendar';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CustomDateFormatterService  extends CalendarDateFormatter {
    // you can override any of the methods defined in the parent class

    public dayViewHour({ date, locale }: DateFormatterParams): string {
      return new DatePipe(locale).transform(date, 'HH:mm', locale);
    }

    public weekViewHour({ date, locale }: DateFormatterParams): string {
      return this.dayViewHour({ date, locale });
    }
  }
