import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import * as moment from 'moment';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    viewDate = new Date();
    day = moment(this.viewDate);
    hourSegments = 3; //hourSegments = ( interval / hour)
    rooms = [{
        id: 0,
        name: 'Room 1'
    },
    {
        id: 1,
        name: 'Room 2',
    },
    {
        id: 2,
        name: 'Room 3'
    },
    {
        id: 3,
        name: 'Room 4',
    }];
    events: CalendarEvent[] = [
        {
            title: 'An event',
            start: this.day.set({ hour: 10, minute: 10, second: 0, millisecond: 0 }).toDate(),
            meta: {
                user: this.rooms[0]
            },
            resizable: {
                beforeStart: true,
                afterEnd: true
            },
        },
        {
            title: 'An event',
            start: this.day.set({ hour: 10, minute: 20, second: 0, millisecond: 0 }).toDate(),
            meta: {
                user: this.rooms[0]
            },
            resizable: {
                beforeStart: true,
                afterEnd: true
              },
        },
        {
            title: 'An test',
            start: this.day.set({ hour: 10, minute: 25, second: 0, millisecond: 0 }).toDate(),
            meta: {
                user: this.rooms[0]
            },
            resizable: {
                beforeStart: true,
                afterEnd: true
              },
        },
        {
            title: 'Another event',
            start: this.day.set({ hour: 15, minute: 0, second: 0, millisecond: 0 }).toDate(),
            meta: {
                user: this.rooms[1]

            },
            resizable: {
                beforeStart: true,
                afterEnd: true
              },
        },
        {
            title: 'An 3rd event',
            start: this.day.set({ hour: 17, minute: 0, second: 0, millisecond: 0 }).toDate(),
            meta: {
                user: this.rooms[3]
            },
            resizable: {
                beforeStart: true,
                afterEnd: true
              },
        }
    ];

    workingHours = {
        dayStartHour: 9,
        dayStartMinute: 0,
        dayEndHour: 18,
        dayEndMinute: 0,
    };
}
