import { Component, Input, OnInit } from '@angular/core';
import { Currency, DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
  providers: [],
})
export class DishesComponent implements OnInit {
  @Input() dishes: DishTemplate[] = [];
  @Input() currency: Currency = Currency.Dolar;

  most_expensive_price: number = 0;
  cheapest_price: number = 0;

  current_selection = new Map<number, number>();

  constructor(private dish_managment: DishManagmentService) {
    this.dish_managment.deleteDish$.subscribe((dish) => {
      this.dishes = this.dishes.filter((d) => d.id != dish.id);
      this.current_selection.delete(dish.id);
      this.find_most_least_expensive();
      console.log(this.dishes);
      this.find_most_least_expensive();
      this.dish_managment.updateCart(this.current_selection)
    });

    this.dish_managment.createDish$.subscribe((dish) => {
      console.log(dish);
      let id = Math.floor(Math.random()*1000);
      let new_dish: DishTemplate = {
        id: id,
        name: dish.name,
        maximum_per_day: dish.maximum_per_day,
        cuisine: dish.cuisine,
        price: dish.price,
        pictures: ["../../assets/images/missing.jpeg"],
      };
      this.dishes.push(new_dish);
      this.find_most_least_expensive();
    });


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

  ngOnChanges(): void {
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
    this.dish_managment.updateCart(this.current_selection);
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
