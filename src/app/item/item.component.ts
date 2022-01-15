import { Component, Input, OnInit } from '@angular/core';
import { Currency, DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {

  @Input() item: DishTemplate = {
    id: '0',
    name: 'none',
    cuisine: 'międzynarodowa',
    maximum_per_day: 1,
    price: 1,
    pictures: [],
  };
  @Input() expensive = 0;
  @Input() cheap = 0;
  currency: Currency;
  count: number = 0;
  missing_picture_path = "/assets/images/missing.jpeg";

  constructor(private dish_service: DishManagmentService) {
    this.dish_service.cartChanged$.subscribe((new_cart) => {
      this.count = this.dish_service.numberInCart(this.item.id);
    });

    this.currency = this.dish_service.getCurrercy();
    this.dish_service.currencyChanged$.subscribe(c => this.currency = c);
  }

  ngOnInit(): void {
    this.count = this.dish_service.numberInCart(this.item.id);
  }

  addToCart(): void {
    this.dish_service.addToCart(this.item.id);
  }

  removeFromCart(): void {
    this.dish_service.removeFromCart(this.item.id);
  }

  removeFromMenu(): void {
    this.dish_service.removeFromMenu(this.item.id);
  }
}
