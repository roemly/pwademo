import { Directive, ElementRef, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[clickGoBack]'
})
export class ClickGoBack {
constructor(private el: ElementRef, private location: Location) { }
   @HostListener('click') onClick() {
    this.location.back();
  }
}