import { Component, Input, OnInit } from '@angular/core';
import { DishTemplate } from '../app.component';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent implements OnInit {
  @Input() dishes: DishTemplate[] = [];
  most_expensive_price: number = 0;
  cheapest_price: number = 0;

  current_selection = new Map<number, number>();

  constructor() {
  }

  find_most_least_expensive() {
    this.most_expensive_price = this.dishes.reduce(function (a, b) {
      return Math.max(a, b.price);
    }, 0);

    this.cheapest_price = this.dishes.reduce(function (a, b) {
      return Math.min(a, b.price);
    }, 1000);
  }

  ngOnInit(): void {}

  ngOnChanges():void{
    this.find_most_least_expensive();
  }

  addItem(dish: any) {
    console.log('dish to add');
    console.log(dish);
    let id = dish.id;
    if (this.current_selection.has(dish.id)) {
      let current_value = this.current_selection.get(id);
      this.current_selection.set(id, current_value! + 1);
    } else {
      this.current_selection.set(id, 1);
    }
  }

  removeItem(dish: any) {
    console.log('dish to remove');
    console.log(dish);
    let id = dish.id;
    if (this.current_selection.has(dish.id)) {
      let current_value = this.current_selection.get(id);
      if (current_value === 1) {
        this.current_selection.delete(id);
      } else {
        this.current_selection.set(id, current_value! - 1);
      }
    }
  }
}
