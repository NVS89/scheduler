import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-current-time-marker',
    templateUrl: './current-time-marker.component.html',
    styleUrls: ['./current-time-marker.component.scss']
})
export class CurrentTimeMarkerComponent implements OnInit {
    @Input() segment;
    @Input() segmentStep: number;
    position = 0;

    constructor() { }

    ngOnInit() {
        this.setPositionOfMarker();
    }

    setPositionOfMarker() {
        debugger
        const currentMinute = new Date().getMinutes();
        const timeDelta =  currentMinute > this.segmentStep ? (currentMinute - this.segmentStep) : currentMinute;
        this.position = (timeDelta / this.segmentStep) *  this.segment.elemHeigth;
        console.log('===================================================');
        console.log(this.segment);
        console.log('===================================================');
        console.log('===================================================');
        console.log(this.position);
        console.log('===================================================');
    }
}
