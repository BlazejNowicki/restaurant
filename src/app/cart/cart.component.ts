import { Component, Input, OnInit } from '@angular/core';
import { DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Input() dishes: DishTemplate[] = [];
  current_selection: Map<number, number> | null = null;
  selection_with_names: { name: String; count: number }[] = [];
  sum: number = 0;

  constructor(private dish_managment: DishManagmentService) {
    this.dish_managment.cart_updeted$.subscribe((new_selection) => {
      this.current_selection = new_selection;
      this.selection_with_names = [];
      this.sum = 0;
      console.log(this.current_selection);
      for (let [key, value] of this.current_selection) {
        let tmp = this.dishes.find((dish) => dish.id === key);
        if (tmp != null) {
          this.selection_with_names.push({ name: tmp!.name, count: value });
          this.sum += value;
        }
      }
    });
  }

  ngOnInit(): void {}
}
