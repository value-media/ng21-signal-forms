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
selectedMonths: string[] = [];

public get monthsSelected(): boolean {
  return this.selectedMonths.length > 0;
}

onMonthChange(event: Event, month: string) {
  const checkbox = event.target as HTMLInputElement; // Rzutowanie na odpowiedni typ
  const isChecked = checkbox.checked; // Pobranie wartości true/false

  if (isChecked) {
    this.selectedMonths.push(month);
  } else {
    this.selectedMonths = this.selectedMonths.filter(m => m !== month);
  }
}

}
