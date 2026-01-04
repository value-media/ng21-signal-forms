import { DomObserver } from './../../helpers/dom-observer';
import { Component, OnDestroy, afterNextRender, effect, inject, signal, untracked, viewChildren } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item';
import { TodoItemsService } from '../items-service';
import { TodoStats } from '../todo-stats/todo-stats';

@Component({
  selector: 'app-manage-todos',
  imports: [TodoStats, TodoItemComponent],
  templateUrl: './manage-todos.html',
  styleUrl: './manage-todos.css'
})
export class ManageTodos implements OnDestroy {
  todoComponents = viewChildren(TodoItemComponent);
  public service = inject(TodoItemsService);
  justAddedId = signal<number | null>(null);
  domObserver = new DomObserver({
    tagName: 'app-todo-item',
    addedCssClass: 'just-added'
  });

  async fetchItems() {
    await this.service.fetchItems();
  }

  constructor() {
    effect(() => {
      const id = this.justAddedId();
      if (id !== null) {
          const comps = this.todoComponents();
          const found = comps.find(c => c.item.id === id);
          if (found) {
            found.showEditDialog();
            this.justAddedId.set(null);
          }
      }
    });    


    // observe added DOM todo items
    this.domObserver.observe();
  }
  
  addNew = () => {
    const id = Math.floor(Math.random() * 100000);
    
    this.service.addTodo({
      userId: 1,
      id,
      title: 'Nowe zadanie',
      completed: false
    });

    this.justAddedId.set(id);
  }

  ngOnDestroy(): void {    
    this.domObserver.disconnect();
  }

}

