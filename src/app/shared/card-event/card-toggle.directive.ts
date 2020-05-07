import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
    selector: '[cardToggleEvent]'
})
export class CardToggleDirectiveEvent {
    constructor(private el: ElementRef) { }

    @HostListener('click', ['$event'])
    onToggle($event: any) {
        $event.preventDefault();
        this.el.nativeElement.classList.toggle('icon-up');
    }
}