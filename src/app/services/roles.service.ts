import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  public isAdmin = signal(false);

  setAdminStatus(isAdmin: boolean) {
    this.isAdmin.set(isAdmin);
  }

  constructor() { }
}
