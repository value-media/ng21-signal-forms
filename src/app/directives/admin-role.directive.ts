import { RolesService } from './../services/roles.service';
import { Directive, inject, TemplateRef, ViewContainerRef, effect, ElementRef } from '@angular/core';

@Directive({
  selector: '[adminRole]'
})
export class AdminRoleDirective {
  private el = inject(ElementRef<HTMLElement>);
  rolesService = inject(RolesService);

  constructor() {
    effect(() => {
      this.el.nativeElement.style.display = 
        this.rolesService.isAdmin() ? '' : 'none'; 
    });
  }

}
