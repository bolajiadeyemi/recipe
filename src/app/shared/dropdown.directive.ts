import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';


@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {

  /*  isOpen = false;

    constructor(private elm: ElementRef, private renderer: Renderer2) {

    }

    @HostListener('click')
    toggleOpen() {

      if (this.isOpen) {
        this.renderer.removeClass(this.elm.nativeElement, 'open');
        this.isOpen = false;
      } else {
        this.renderer.addClass(this.elm.nativeElement, 'open');
        this.isOpen = true;
      }
    }*/

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

}
