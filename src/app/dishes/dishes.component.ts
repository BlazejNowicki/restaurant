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
  dishes: DishTemplate[] = [];
  selection: DishTemplate[] = [];
  currency: Currency = Currency.Dolar;

  most_expensive_price: number = 0;
  cheapest_price: number = 0;

  page_size: number = 5;
  page: number = 0;
  sizes: number[] = [5,10,15];
  show_next: boolean = false;

  constructor(private dish_managment: DishManagmentService) {
    this.dishes = dish_managment.getMenu();

    this.dish_managment.menuChanged$.subscribe((new_menu) => {
      this.dishes = new_menu;
      this.find_most_least_expensive();
    });

    this.pageChanged();
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

  prev(){
    this.page -= 1;
    this.pageChanged();
  }

  next(){
    this.page += 1;
    this.pageChanged();
  }

  pageChanged(){
    this.show_next = (this.page + 1) * this.page_size < this.dishes.length;
    this.selection = this.dishes.slice(this.page * this.page_size, (this.page + 1) * this.page_size);
  }

  onPageSizeChange(deviceValue: any) {
    console.log(deviceValue);
    this.page_size = parseInt(deviceValue.target.value);
    console.log(this.page_size);
    this.page = 0;
    this.pageChanged();
  }
}
