"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CardRefreshDirectiveSmall = (function () {
    function CardRefreshDirectiveSmall(el) {
        this.el = el;
    }
    CardRefreshDirectiveSmall.prototype.open = function () {
        this.el.nativeElement.classList.add('rotate-refresh');
    };
    CardRefreshDirectiveSmall.prototype.close = function () {
        this.el.nativeElement.classList.remove('rotate-refresh');
    };
    return CardRefreshDirectiveSmall;
}());
__decorate([
    core_1.HostListener('mouseenter')
], CardRefreshDirectiveSmall.prototype, "open", null);
__decorate([
    core_1.HostListener('mouseleave')
], CardRefreshDirectiveSmall.prototype, "close", null);
CardRefreshDirectiveSmall = __decorate([
    core_1.Directive({
        selector: '[cardRefresh]'
    })
], CardRefreshDirectiveSmall);
exports.CardRefreshDirectiveSmall = CardRefreshDirectiveSmall;
