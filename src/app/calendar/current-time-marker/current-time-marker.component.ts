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
        const timeDelta = (currentMinute / this.segmentStep);
        const proportion = currentMinute > this.segmentStep ? timeDelta - Math.trunc(timeDelta) : timeDelta;
        this.position = proportion * this.segment.elemHeigth;
    }

    ngOnDestroy() {
        this.redrawTimeMarkerSubscription.unsubscribe();
    }
}
