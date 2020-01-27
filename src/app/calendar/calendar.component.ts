import { CustomDateFormatterService } from './custom-date-formatter.service';
import { DayViewScheduler } from './day-view-scheduler';
import { DayViewSchedulerCalendarUtils } from './calendar.service';
import { CalendarUtils, CalendarWeekViewComponent, CalendarDateFormatter } from 'angular-calendar';
import { Component, EventEmitter, Output, ViewChild, ElementRef, ViewChildren, QueryList, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    providers: [
        {
            provide: CalendarUtils,
            useClass: DayViewSchedulerCalendarUtils
        },
        {
            provide: CalendarDateFormatter,
            useClass: CustomDateFormatterService
        }
    ],
})
export class CalendarComponent extends CalendarWeekViewComponent implements OnInit {
    @ViewChild('column', { static: false }) column: ElementRef;
    @ViewChildren('event') event: QueryList<ElementRef>;
    @Output() userChanged = new EventEmitter();
    @Input() user;

    view: DayViewScheduler;

    daysInWeek = 1;

    locale = 'uk';

    ngOnInit(): void {
        console.log('===================================================');
        console.log('this.view', this.view);
        console.log('===================================================');

    }
}
