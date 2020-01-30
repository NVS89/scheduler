import { Component, OnInit, Input, HostBinding, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';

@Component({
    selector: 'app-time-segment',
    templateUrl: './time-segment.component.html',
    styleUrls: ['./time-segment.component.scss']
})
export class TimeSegmentComponent implements OnInit, AfterViewInit {
    @ViewChildren('timeSegment') timeSegment: QueryList<any>;
    @Input() segments;
    @Input() users;
    showMarker: boolean;
    hourHeigth: number[] = [];
    segmentStep: number;
    constructor(
        private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.checkCurrentTime();
        this.segmentStep = 60 / this.segments.length;
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
}
