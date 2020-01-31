import { Component, OnInit, Input, ElementRef, AfterViewInit, ChangeDetectorRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
    selector: 'app-time-segment',
    templateUrl: './time-segment.component.html',
    styleUrls: ['./time-segment.component.scss']
})
export class TimeSegmentComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren('timeSegment') timeSegment: QueryList<any>;
    @Input() segments;
    @Input() users;
    showMarker: boolean;
    hourHeigth: number[] = [];
    segmentStep: number;
    checkCurrentTimeIntervalSubscription: Subscription;
    oneHour = 60;
    fiveMinutes = 50000;

    constructor(
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.checkCurrentTime();
        this.segmentStep = this.oneHour / this.segments.length;
        const checkCurrentTimeInterval = interval(this.fiveMinutes);
        this.checkCurrentTimeIntervalSubscription = checkCurrentTimeInterval.subscribe(
            () => {
                this.checkCurrentTime();
            }
        );
    }

    ngAfterViewInit() {
        this.showMarker = true;
        this.hourHeigth = [];
        this.timeSegment.forEach((element: ElementRef) => {
            this.hourHeigth.push(element.nativeElement.offsetHeight);
        });
        this.mapHeigth();

        this.cdRef.detectChanges();
    }

    checkCurrentTime() {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        for (let i = 0; i < this.segments.length; i++) {
            const segnentHour = this.segments[i].date.getHours();
            const segmentMinute = this.segments[i].date.getMinutes();
            if (
                segnentHour === currentHour &&
                currentMinute >= segmentMinute
            ) {
                if (!this.segments[(i + 1)] || currentMinute < this.segments[(i + 1)].date.getMinutes()) {
                    this.segments[i].showMarker = true;
                }
            }
        }
    }

    mapHeigth() {
        for (let i = 0; i < this.hourHeigth.length; i++) {
            this.segments[i].elemHeigth = this.hourHeigth[i];
        }
        this.segments = [... this.segments];
    }

    ngOnDestroy(): void {
        this.checkCurrentTimeIntervalSubscription.unsubscribe();
    }
}
