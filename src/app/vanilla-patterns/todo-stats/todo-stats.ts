import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TodoItemsService } from '../items-service';
import { DebugCd } from '../../debug-cd';

@Component({
  selector: 'app-todo-stats',
  imports: [DebugCd],
  templateUrl: './todo-stats.html',
  styleUrl: './todo-stats.css'
})
export class TodoStats {
  public service = inject(TodoItemsService);
}
