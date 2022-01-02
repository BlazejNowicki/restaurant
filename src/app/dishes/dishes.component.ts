import { Component, Input, OnInit } from '@angular/core';
import { Currency, DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
  providers: [],
})
export class DishesComponent implements OnInit {
  dishes: DishTemplate[] = [];
  currency: Currency = Currency.Dolar;

  most_expensive_price: number = 0;
  cheapest_price: number = 0;

  // page_size: number;
  // page: number;
  // sizes: number[];

  constructor(private dish_managment: DishManagmentService) {
    this.dishes = dish_managment.getMenu();

    this.dish_managment.menuChanged$.subscribe((new_menu) => {
      this.dishes = new_menu;
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

  onPageSizeChange(deviceValue: any) {
    console.log(deviceValue);
  }
}
