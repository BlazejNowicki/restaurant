import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { Currency, DishTemplate } from './app.component';
import { ReviewManagmentService } from './review-managment.service';

@Injectable({
  providedIn: 'root',
})
export class DishManagmentService {
  menu: DishTemplate[] = [];
  cart: Map<string, number> = new Map();
  currency: Currency = Currency.Dolar;

  private dbPath = 'dishes';
  menuRef: AngularFirestoreCollection<any>;

  menuIDs: Map<number, string> = new Map();

  private cart_changed = new Subject<Map<string, number>>();
  private currency_changed = new Subject<Currency>();
  cartChanged$ = this.cart_changed.asObservable();
  currencyChanged$ = this.currency_changed.asObservable();

  constructor(
    private review_service: ReviewManagmentService,
    private firestore: AngularFirestore
  ) {
    this.menuRef = this.firestore.collection(this.dbPath);
  }

  public getMenu() {
    return this.menuRef;
  }

  public getCart(): Map<string, number> {
    return this.cart;
  }

  public getDishById(id: string) {
    return this.menuRef.doc(id);
  }

  public numberInCart(id: string): number {
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
    cuisine: string,
    categories: string[],
    ingredients: string[],
    max_per_day: number,
    price: number,
    description: string,
    pictures: string[]
  ): void {
    //   let id: string;
    //   let id_ok = false;
    //   do {
    //     id_ok = true;
    //     id = Math.floor(Math.random() * 1000);
    //     for (let item of this.menu) {
    //       if (id == item.id) {
    //         id_ok = false;
    //       }
    //     }
    //   } while (!id_ok);
    //   const new_item = {
    //     id: id,
    //     name: name,
    //     cuisine,
    //     ingredients,
    //     categories,
    //     maximum_per_day: max_per_day,
    //     price: price,
    //     description,
    //     pictures,
    //   };
    //   this.menu.push(new_item);
    //   this.firestore
    //     .collection('dishes')
    //     .add(new_item)
    //     .then(
    //       (res) => {},
    //       (err) => console.log(err)
    //     );
    //   this.menu_changed.next(this.menu);
  }

  public removeFromMenu(id: string): void {
    //   this.menu = this.menu.filter((e) => e.id != id);
    //   this.cart.delete(id);
    //   this.review_service.dishDeleted(id);
    //   console.log(this.menuIDs);
    //   console.log(id);
    //   console.log(this.menuIDs.get(id));
    //   this.firestore.collection('dishes').doc(this.menuIDs.get(id)).delete();

    //   this.menu_changed.next(this.menu);
    //   this.cart_changed.next(this.cart);
    console.log('remove from menu');
  }

  public addToCart(id: string): void {
    // console.log('Add to cart ' + id);
    // let current_number;
    // if (this.cart.has(id)) {
    //   current_number = this.cart.get(id);
    // } else {
    //   current_number = 0;
    // }
    // this.cart.set(id, current_number! + 1);
    // this.cart_changed.next(this.cart);
  }

  public removeFromCart(id: string): void {
    // console.log('Remove from cart ' + id);
    // if (this.cart.has(id)) {
    //   let current_number = this.cart.get(id)!;
    //   if (current_number > 1) {
    //     this.cart.set(id, current_number - 1);
    //   } else {
    //     this.cart.delete(id);
    //   }
    // }
    // this.menu_changed.next(this.menu);
    // this.cart_changed.next(this.cart);
  }
}
