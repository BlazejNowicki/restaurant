import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DishTemplate } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class DishManagmentService {
  dishes: DishTemplate[] = [
    {
      id: 1,
      name: 'Margherita',
      cuisine: "włoska",
      maximum_per_day: 10,
      description: "Klasyczna pizza: sos pomidorowy, ser.",
      price: 10,
      pictures: ['../../assets/images/01.jpg'],
    },
    {
      id: 2,
      name: ' Quattro Forrmagi',
      cuisine: "włoska",
      maximum_per_day: 4,
      price: 12,
      description: "Pizza premium: sos pomidorowy, cztery sery.",
      pictures: ['/assets/images/02.jpg'],
    },
    {
      id: 3,
      name: 'Lasange',
      cuisine: "włoska",
      maximum_per_day: 0,
      price: 11,
      description: "Tradycyjny włoski makaron.",
      pictures: ['/assets/images/03.jpeg'],
    }
  ]

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

  getDishes(): DishTemplate[]{
    return this.dishes;
  }
}
