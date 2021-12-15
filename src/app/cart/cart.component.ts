import { Component, Input, OnInit } from '@angular/core';
import { DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() dishes: DishTemplate[] = [];
  current_selection: Map<number, number> | null = null;
  selection_with_names: {name: String, count: number}[] = [];

  constructor(private dish_managment: DishManagmentService) {

    this.dish_managment.cart_updeted$.subscribe((new_selection) => {
      this.current_selection = new_selection;
      console.log(this.current_selection);

      this.selection_with_names = [];
      for (let [key, value] of this.current_selection) {
        console.log(key + " = " + value);
        let tmp = this.dishes.find(dish => dish.id === key)
        // if(tmp != null){

        // }
        this.selection_with_names.push({name: tmp!.name, count: value});
      }
      console.log(this.selection_with_names);
    });
  }

  ngOnInit(): void {
  }


}
