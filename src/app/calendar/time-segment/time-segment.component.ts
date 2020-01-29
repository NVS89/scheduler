import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-time-segment',
    templateUrl: './time-segment.component.html',
    styleUrls: ['./time-segment.component.scss']
})
export class TimeSegmentComponent implements OnInit {
    @Input() segments;
    @Input() users;
    constructor() { }

    ngOnInit() {
    }

}
