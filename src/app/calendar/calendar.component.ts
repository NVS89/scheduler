import { CustomDateFormatterService } from './custom-date-formatter.service';
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
    @ViewChild('hourRow', { static: false }) hourRow: ElementRef;
    @ViewChildren('event') event: QueryList<ElementRef>;
    @Output() userChanged = new EventEmitter();
    @Input() user;

    view: any;

    daysInWeek = 1;

    locale = 'uk';

    eventList = [];

    ngOnInit(): void {
        this.processView();
    }
    processView() {
        for (const column of this.view.hourColumns) {
            this.processEvent(column.events);
            this.processTimeSegment(column.hours);
        }
    }

    processEvent(events) {
        for (const { event } of events) {
            event['timeStart'] = {
                hour: this.formatTime(event.start.getHours()),
                minute: this.formatTime(event.start.getMinutes()),
            };
            this.eventList.push(event);
        }
    }

    processTimeSegment(hours) {
        for (const hour of hours) {
            for (const segment of hour.segments) {
                segment['events'] = [];
                segment['time'] = {
                    hour: this.formatTime(segment.displayDate.getHours()),
                    minute: this.formatTime(segment.displayDate.getMinutes()),
                };
                this.mapEvents(segment);
            }
        }
    }

    formatTime(time) {
        return time < 10 ? '0' + time : time.toString();
    }

    mapEvents(segment) {
        for (const event of this.eventList) {
            if (event.start.getHours() === segment.date.getHours()) {
                if (event.start.getMinutes() >= segment.date.getMinutes()) {
                    segment.events.push(event);
                }
            }
        }
    }
}
