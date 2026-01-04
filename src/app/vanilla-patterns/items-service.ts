import { computed, effect, Injectable, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { HttpClient } from './helpers/HttpClient';
import { TodoItem } from './types/todo-item';
import { createStore } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService implements OnDestroy {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private httpClient = new HttpClient();
  public isLoading = signal(false);
  public items = signal<TodoItem[]>([]);
  public store = createStore({ todos: [] });

  constructor() {    
    effect(() => {
      this.store.setState({ todos: this.items() });
    });    
  }

  fetchItems = async () => {
    this.isLoading.set(true);
    const items = await this.httpClient.get<TodoItem[]>(this.apiUrl) as TodoItem[];
    items.length = 25;
    
    this.items.set(items);
    this.isLoading.set(false);
  }

  public addTodo(item: TodoItem): void {
    this.items.set([...this.items(), item]);
  }

  public setCompleted(id: number, completed: boolean): void {
    const arr: TodoItem[] = this.items();
    const idx = arr.findIndex(item => item.id === id);  
    if (idx !== -1) {
      arr[idx] = { ...arr[idx], completed };
      this.items.set([...arr]);
    }
  }

  public deleteTodo(id: number): void {
    const arr: TodoItem[] = this.items();
    const idx = arr.findIndex(item => item.id === id);
    if (idx !== -1) {
      arr.splice(idx, 1);
      this.items.set([...arr]);
    }
  }

  public setTitle(id: number, title: string): void {
    const arr: TodoItem[] = this.items();
    const idx = arr.findIndex(item => item.id === id);
    if (idx !== -1) {
      arr[idx] = { ...arr[idx], title };
      this.items.set([...arr]);
    }
  }
  
  ngOnDestroy(): void {    
    this.store.unsubscribe();
  }
  
  public readonly totalCount = computed(() => this.items().length);
  
  public readonly completedCount = computed(() => this.items().filter(item => item.completed).length);
}

