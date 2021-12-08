import { Component } from '@angular/core';
import { DishManagmentService } from './dish-managment.service';

export interface DishTemplate {
  id: number,
  name: string;
  cuisine: string;
  categories?: string[],
  ingredients?: string[],
  maximum_per_day: number;
  price: number,
  description?: string,
  pictures: string[],
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant';

  dishes: DishTemplate[] = [];

  constructor(private dish_service: DishManagmentService){
    this.dishes = dish_service.getDishes();
    // dish_service.deleteDish$.subscribe()
  }



}
