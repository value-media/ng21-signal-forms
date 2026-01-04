import {
  Directive,
  ElementRef,
  Renderer2,
  DoCheck
} from '@angular/core';

@Directive({
  selector: '[appDebugCd]',
})
export class DebugCd implements DoCheck {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngDoCheck() {
    this.renderer.addClass(this.el.nativeElement, 'cd-global-hit');
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        this.renderer.removeClass(this.el.nativeElement, 'cd-global-hit');
      }, 1000);
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'cd-global-hit');
    }
  }

}
