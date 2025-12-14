import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppForm } from "./app-form/app-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ng21-signal-forms');
}
