import { Directive, ElementRef, OnInit, HostListener, Input, HostBinding } from '@angular/core';

@Directive({
    selector: '[resize]',
})
export class ResizeDirective implements OnInit {
    @Input() resize;
    @HostBinding('style.width.px')
    width: number;
    @HostBinding('style.left.px')
    left: number;
    @HostListener('window:resize')
    onResize() {
        this.resizeElement();
    }

    constructor(private el: ElementRef) {}

    ngOnInit(): void {

        this.resizeElement();

    }

    resizeElement() {
        const colWidth = this.resize.headers.children[0].offsetWidth;
        const offsetLeft = this.resize.offsetLeft;
        this.width = colWidth;
        this.left = offsetLeft * colWidth;
    }
}
