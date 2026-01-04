import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { compose } from '../helpers';
import { TodoItemsService } from '../vanilla-patterns/items-service';

type Tile = { text: string; title: string; height: number, index: number };

@Component({
  selector: 'app-mansory-grid',
  imports: [],
  templateUrl: './mansory-grid.html',
  styleUrl: './mansory-grid.css',
})
export class MansoryGrid implements OnDestroy{
  public service = inject(TodoItemsService);
  tiles: Tile[] = [];
  unsubscribeTodos: () => boolean;

  getHeightFluctuation = (h: number): number => (h % 3) * 30;
  getHeightOffset = (h: number): number => h + 140;
  getHeightValue = (idx: number): number => 
    compose<number>(this.getHeightOffset, this.getHeightFluctuation)(idx);
  getHeightLabel = (idx: number): string => 
    `height:${this.getHeightValue(idx)}px`;

  resetTiles = () => {
    const todos = (this.service.store.getState() as any)?.todos as any ?? [];
    if (todos.length) {
      const tiles: Tile[] = [];
      let idx = 1;
      for(const td of todos) {
        tiles.push({
          text: td.title,
          title: `(${td.id}) - ${td.completed ? 'Completed' : 'Pending'}`,
          height: this.getHeightValue(idx),
          index: idx++
        });
      }
      this.tiles = tiles;
    }
    else {
      this.tiles = Array.from({ length: 50 }, (_, i) => ({
        text: `Tile ${i + 1}`,
        title: `This is tile number ${i + 1}`,
        height: this.getHeightValue(i),
        index: i
      }));
    }    
  } 

  constructor() {
    this.resetTiles();    
    this.unsubscribeTodos = this.service.store
      .subscribe((state: unknown) => {
        this.resetTiles();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeTodos();
  }
}
