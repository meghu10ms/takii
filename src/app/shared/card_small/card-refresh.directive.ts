import {Directive, HostListener, ElementRef} from '@angular/core';

@Directive({
    selector: '[cardRefresh]'
})
export class CardRefreshDirectiveSmall {

    constructor(private el: ElementRef) {}
    @HostListener('mouseenter') open() {
        this.el.nativeElement.classList.add('rotate-refresh');
    }

    @HostListener('mouseleave') close() {
        this.el.nativeElement.classList.remove('rotate-refresh');
    }
}