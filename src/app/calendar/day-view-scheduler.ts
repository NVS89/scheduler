import { WeekView } from 'calendar-utils';
export interface DayViewScheduler extends WeekView {
    users: any[];
    dayStart: {
        hour: number;
        minute: number;
    };
    dayEnd: {
        hour: number;
        minute: number;
    };
}
