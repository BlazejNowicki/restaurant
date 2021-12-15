import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DishTemplate } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class DishManagmentService {

  constructor() { }

  private create_dish_subject = new Subject<DishTemplate>();
  private delete_dish_subject = new Subject<DishTemplate>();
  private cart_updated = new Subject<Map<number, number>>()

  createDish$ = this.create_dish_subject.asObservable();
  deleteDish$ = this.delete_dish_subject.asObservable();
  cart_updeted$ = this.cart_updated.asObservable();


  public createNewDish(new_dish: DishTemplate) {
    this.create_dish_subject.next(new_dish);
  }

  public deleteSelectedDish(to_remove: DishTemplate){
    this.delete_dish_subject.next(to_remove);
  }

  public updateCart(current_selection: Map<number, number>){
    this.cart_updated.next(current_selection);
  }
}
