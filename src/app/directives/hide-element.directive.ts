import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[hideElement]'
})
export class HideElementDirective {
  private tpl = inject(TemplateRef<any>);
  private vcr = inject(ViewContainerRef);

  @Input() set hideElement(condition: boolean) {
    if (!this.vcr || !this.tpl) return;
    this.vcr.clear();
    if (condition) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
  constructor() { }

}
