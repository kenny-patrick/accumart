import { Injectable } from '@angular/core';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[] = [];

  addItem(item: Item) {
    this.items.push(item);
  }

  removeItem(id: number) {
    this.items = this.items.filter(function (el) {
      return el.id != id;
    });
  }

  getItems(): Item[] {
    return this.items;
  }
}
