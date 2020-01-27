import { ResizeDirective } from './calendar/resize.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { CalendarComponent } from './calendar/calendar.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

import localeFr from '@angular/common/locales/uk';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr, 'uk');

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ResizeDirective
  ],
  imports: [
    BrowserModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
