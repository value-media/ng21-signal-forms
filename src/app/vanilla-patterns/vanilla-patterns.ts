import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-vanilla-patterns',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './vanilla-patterns.html',
  styleUrl: './vanilla-patterns.css',
})
export class VanillaPatterns {
  rolesService = inject(RolesService);
}
