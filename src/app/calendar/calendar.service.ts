import { DayViewScheduler } from './day-view-scheduler';
import { CalendarUtils } from 'angular-calendar';
import { Injectable } from '@angular/core';
import { GetWeekViewArgs } from 'calendar-utils';
import * as lodash from 'lodash';

@Injectable()
export class DayViewSchedulerCalendarUtils extends CalendarUtils {

    getWeekView(args: GetWeekViewArgs): DayViewScheduler {
        const view: DayViewScheduler = {
            ...super.getWeekView({...args}),
            dayStart: args.dayStart,
            dayEnd: args.dayEnd,
            users: []
        };

        view.hourColumns[0].events.forEach(({ event }) => {
            // assumes user objects are the same references,
            // if 2 users have the same structure but different object references this will fail
            if (!view.users.includes(event.meta.user)) {
              view.users.push(event.meta.user);
            }
          });

        view.hourColumns[0].events = view.hourColumns[0].events.map(
            dayViewEvent => {
                const index = lodash.findIndex(view.users, dayViewEvent.event.meta.user);
                dayViewEvent.left = index; // change the column of the event
                return dayViewEvent;
            }
        );
        return view;
    }
}

