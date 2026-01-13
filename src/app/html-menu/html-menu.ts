import { Component } from '@angular/core';

@Component({
  selector: 'app-html-menu',
  imports: [],
  templateUrl: './html-menu.html',
  styleUrl: './html-menu.css',
})
export class HtmlMenu {
yearMonths = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - i);
  return date.toISOString().slice(0, 7);
});

}
