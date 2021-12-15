import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, Input } from '@angular/core';
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

export enum Currency {
  Euro="euro",
  Dolar="dolar",
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant';
  currency = Currency.Dolar;
  dishes: DishTemplate[] = [];

  constructor(private dish_service: DishManagmentService){
    this.dishes = dish_service.getDishes();
  }

  euroSelected(){
    this.currency = Currency.Euro;
  }

  dolarSelected(){
    this.currency = Currency.Dolar;
  }
}
