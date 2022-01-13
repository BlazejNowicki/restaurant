import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { Currency, DishTemplate } from './app.component';
import { ReviewManagmentService } from './review-managment.service';

@Injectable({
  providedIn: 'root',
})
export class DishManagmentService {
  menu: DishTemplate[] = [];
  cart: Map<number, number> = new Map();
  currency: Currency = Currency.Dolar;

  private menu_changed = new Subject<DishTemplate[]>();
  private cart_changed = new Subject<Map<number, number>>();
  private currency_changed = new Subject<Currency>();
  menuChanged$ = this.menu_changed.asObservable();
  cartChanged$ = this.cart_changed.asObservable();
  currencyChanged$ = this.currency_changed.asObservable();

  constructor(
    private review_service: ReviewManagmentService,
    private firestore: AngularFirestore
  ) {
    this.firestore
      .collection('dishes')
      .snapshotChanges()
      .subscribe((res) => {
        console.log(res);
        let new_menu = [];
        for(let item of res){
          new_menu.push(item.payload.doc.data() as DishTemplate);
        }
        this.menu = new_menu;
        console.log('aaaa');
        console.log(this.menu);
        this.menu_changed.next(this.menu);
      });
  }

  public getMenu(): DishTemplate[] {
    return this.menu;
  }

  public getCart(): Map<number, number> {
    return this.cart;
  }

  public getDishById(id: number): DishTemplate {
    return this.menu.filter((item) => item.id == id)[0];
  }

  public numberInCart(id: number): number {
    if (this.cart.has(id)) {
      return this.cart.get(id)!;
    }
    return 0;
  }

  getCurrercy(): Currency {
    return this.currency;
  }

  public setCurrency(currency: Currency) {
    this.currency = currency;
    this.currency_changed.next(this.currency);
  }

  public addToMenu(
    name: string,
    cusine: string,
    max_per_day: number,
    price: number
  ): void {
    let id: number;
    let id_ok = false;
    do {
      id_ok = true;
      id = Math.floor(Math.random() * 1000);
      for (let item of this.menu) {
        if (id == item.id) {
          id_ok = false;
        }
      }
    } while (!id_ok);
    this.menu.push({
      id: id,
      name: name,
      cuisine: cusine,
      maximum_per_day: max_per_day,
      price: price,
      pictures: [],
    });
    this.menu_changed.next(this.menu);
  }

  public removeFromMenu(id: number): void {
    this.menu = this.menu.filter((e) => e.id != id);
    this.cart.delete(id);
    this.review_service.dishDeleted(id);
    this.menu_changed.next(this.menu);
    this.cart_changed.next(this.cart);
  }

  public addToCart(id: number): void {
    console.log('Add to cart ' + id);
    let current_number;
    if (this.cart.has(id)) {
      current_number = this.cart.get(id);
    } else {
      current_number = 0;
    }
    this.cart.set(id, current_number! + 1);
    this.cart_changed.next(this.cart);
  }

  public removeFromCart(id: number): void {
    console.log('Remove from cart ' + id);
    if (this.cart.has(id)) {
      let current_number = this.cart.get(id)!;
      if (current_number > 1) {
        this.cart.set(id, current_number - 1);
      } else {
        this.cart.delete(id);
      }
    }
    this.menu_changed.next(this.menu);
    this.cart_changed.next(this.cart);
  }
}
