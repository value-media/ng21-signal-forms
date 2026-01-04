import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output, signal, ViewChild, WritableSignal } from '@angular/core';
import { DebugCd } from '../../debug-cd';
import { TodoItem } from '../types/todo-item';
import { TodoItemsService } from '../items-service';
import { form, Field, required } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  host: {
    '[attr.data-status]': 'item.completed ? "completed" : "pending"',
    '[style.anchor-name]': '"--item-box-" + item.id'
  },
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
  // hostDirectives: [DebugCd], // wyłączone, bo powoduje odświeżanie wszystkich elementów listy przy zmianie jednego
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DebugCd, Field, CommonModule]
})
export class TodoItemComponent {
  @ViewChild('editDialog') editDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('editInput') editInput!: ElementRef<HTMLInputElement>;
  @Input({ required: true }) item!: TodoItem;
  public service = inject(TodoItemsService);
  protected editModel = signal<TodoItem>({
    completed: false,
    id: 0,
    title: '',
    userId: 0,
  });

  ngOnInit() {
    this.editModel.set({ ...this.item });
  }

  protected editForm = form(this.editModel, m => {
    required(m.title, {
      message: 'Title is required',
    });
  });

  onCompletedChange(event: Event) {
    const completed = (event.target as HTMLInputElement).checked;
    this.service.setCompleted(this.item.id, completed);
  }

  showEditDialog = () => {
    const dialog = this.editDialog.nativeElement;
    dialog.showModal();
    
    this.editInput?.nativeElement.select();
  }

  onCancelEdit() {
    if (this.editModel().title !== this.item.title) {
      this.editModel.set({ ...this.item });
    }

    this.editDialog.nativeElement.close();
  }

  onEditSubmit($event: SubmitEvent) {  
    $event.preventDefault();
    if (this.editModel().title !== this.item.title) {
      this.service.setTitle(this.item.id, this.editModel().title);
    }
    this.editDialog.nativeElement.close();
  }

}
