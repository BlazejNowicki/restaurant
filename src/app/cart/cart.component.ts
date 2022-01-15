import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Currency, DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  dishes: DishTemplate[] = [];
  current_selection: Map<string, number>;
  selection_with_names: { name: string; count: number; price: number }[] = [];
  sum: number = 0;
  value: number = 0;
  currency: Currency;

  constructor(private dish_managment: DishManagmentService) {
    this.current_selection = this.dish_managment.getCart();

    this.dish_managment.cartChanged$.subscribe((new_selection) => {
      this.current_selection = new_selection;
      this.showCart();
    });

    this.currency = this.dish_managment.getCurrercy();
    this.dish_managment.currencyChanged$.subscribe((c) => (this.currency = c));
  }

  showCart() {
    this.selection_with_names = [];
    this.sum = 0;
    this.value = 0;
    for (let [key, value] of this.current_selection) {
      let tmp = this.dishes.find((dish) => dish.id === key);
      if (tmp != null) {
        this.selection_with_names.push({
          name: tmp!.name,
          count: value,
          price: tmp!.price,
        });
        this.sum += value;
        this.value += value * tmp.price;
      }
    }
  }

  ngOnInit(): void {
    this.dish_managment
      .getMenu()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map(
            (c) =>
              ({
                id: c.payload.doc.id,
                ...c.payload.doc.data(),
              } as DishTemplate)
          )
        )
      )
      .subscribe((data) => {
        this.dishes = data;
        console.log(data);
        this.showCart();
      });
  }
}
