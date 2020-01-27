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
    day = moment(this.viewDate);//.utcOffset(0);
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
            start: this.day.set({ hour: 10, minute: 0, second: 0, millisecond: 0 }).toDate(),
            meta: {
                user: this.rooms[0]
            }
        },
        {
            title: 'Another event',
            start: this.day.set({ hour: 15, minute: 0, second: 0, millisecond: 0 }).toDate(),
            meta: {
                user: this.rooms[1]

            }
        },
        {
            title: 'An 3rd event',
            start: this.day.set({ hour: 17, minute: 0, second: 0, millisecond: 0 }).toDate(),
            meta: {
                user: this.rooms[3]
            },
        }
    ];
}
