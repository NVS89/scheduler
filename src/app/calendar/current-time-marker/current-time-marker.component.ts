import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-current-time-marker',
    templateUrl: './current-time-marker.component.html',
    styleUrls: ['./current-time-marker.component.scss']
})
export class CurrentTimeMarkerComponent implements OnInit {
    @Input() segment;
    constructor() { }

    showMarker: boolean;

    ngOnInit() {
        console.log('===================================================');
        console.log(this.segment);
        console.log('===================================================');
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const segnentHour = this.segment.date.getHours();
        const segnentMinute = this.segment.date.getMinutes();

        if (segnentHour === currentHour && currentMinute >= segnentMinute ) {
            this.showMarker = true;
        }
    }

    formatTime(time) {
        return time < 10 ? '0' + time : time.toString();
    }
}
