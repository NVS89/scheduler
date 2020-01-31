import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-current-time-marker',
    templateUrl: './current-time-marker.component.html',
    styleUrls: ['./current-time-marker.component.scss']
})
export class CurrentTimeMarkerComponent implements OnInit, OnDestroy {
    @Input() segment;
    @Input() segmentStep: number;
    redrawTimeMarkerSubscription: Subscription;
    position = 0;
    fiveMinutes = 50000;
    oneHour = 60;

    constructor() { }

    ngOnInit() {
        const redrawTimeMarker = interval(this.fiveMinutes);
        this.setPositionOfMarker();
        this.redrawTimeMarkerSubscription = redrawTimeMarker.subscribe(
            () => {
                this.setPositionOfMarker();
            }
        );
    }

    setPositionOfMarker() {
        const currentMinute = new Date().getMinutes();
        const timeDelta = currentMinute > this.segmentStep ? (this.oneHour - currentMinute - this.segmentStep) : currentMinute;
        this.position = (timeDelta / this.segmentStep) * this.segment.elemHeigth;
        console.log('===================================================');
        console.log(currentMinute);
        console.log(this.segmentStep);
        console.log(timeDelta);
        console.log();
        console.log();
        console.log('===================================================');
    }

    ngOnDestroy() {
        this.redrawTimeMarkerSubscription.unsubscribe();
    }
}
