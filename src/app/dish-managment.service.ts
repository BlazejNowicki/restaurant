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

  private cart_changed = new Subject<Map<string, number>>();
  cartChanged$ = this.cart_changed.asObservable();

  private currency_changed = new Subject<Currency>();
  currencyChanged$ = this.currency_changed.asObservable();

  private data_to_edit =new Subject<DishTemplate>();
  dataChenged$ = this.data_to_edit.asObservable();

  constructor(
    private review_service: ReviewManagmentService,
    private firestore: AngularFirestore
  ) {
    this.menuRef = this.firestore.collection(this.dbPath);
  }

  public getMenu() {
    return this.menuRef;
  }

  public getCart() {
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
    maximum_per_day: number,
    price: number,
    description: string,
    pictures: string[]
  ): void {
    const new_item = {
      name: (name?name:''),
      cuisine: (cuisine?cuisine:''),
      ingredients: (ingredients?ingredients:[]),
      categories: (categories?categories:[]),
      maximum_per_day,
      price: price,
      description: (description?description:""),
      pictures: (pictures?pictures:[]),
    };
    this.firestore
      .collection('dishes')
      .add(new_item)
      .then(
        (res) => {},
        (err) => console.log(err)
      );
  }

  public removeFromMenu(id: string): void {
    this.firestore.collection('dishes').doc(id).delete();
    this.cart.delete(id);
    this.cart_changed.next(this.cart);
  }

  public addToCart(id: string): void {
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

  public removeFromCart(id: string): void {
    console.log('Remove from cart ' + id);
    if (this.cart.has(id)) {
      let current_number = this.cart.get(id)!;
      if (current_number > 1) {
        this.cart.set(id, current_number - 1);
      } else {
        this.cart.delete(id);
      }
    }
    this.cart_changed.next(this.cart);
  }

  public dataToEdit(item: DishTemplate){
    this.data_to_edit.next(item);
  }
}
