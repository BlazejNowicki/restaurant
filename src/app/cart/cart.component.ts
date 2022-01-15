import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Currency, DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  dishes: DishTemplate[] = [];
  current_selection: Map<string, number>;
  selection_with_names: { name: string; count: number; price: number }[] = [];
  sum: number = 0;
  value: number = 0;
  currency: Currency;

  cartSubscription: Subscription | null = null;
  currencySubscription: Subscription | null = null;
  menuSubscription: Subscription | null = null;

  constructor(private dish_managment: DishManagmentService) {
    this.current_selection = this.dish_managment.getCart();

    this.cartSubscription = this.dish_managment.cartChanged$.subscribe((new_selection) => {
      this.current_selection = new_selection;
      this.showCart();
    });

    this.currency = this.dish_managment.getCurrercy();
    this.currencySubscription = this.dish_managment.currencyChanged$.subscribe((c) => (this.currency = c));
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
    this.menuSubscription = this.dish_managment
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

  ngOnDestroy(): void {
    if(this.cartSubscription) this.cartSubscription.unsubscribe();
    if(this.menuSubscription) this.menuSubscription.unsubscribe();
    if(this.currencySubscription) this.currencySubscription.unsubscribe();
  }
}
