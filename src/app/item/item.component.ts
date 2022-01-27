import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Currency, DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';
import { AuthService, AuthState } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit, AfterContentInit {
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
  missing_picture_path = '/assets/images/missing.jpeg';
  user: AuthState = AuthState.Stranger;

  constructor(
    private dish_service: DishManagmentService,
    private auth: AuthService,
    private router: Router
  ) {
    this.dish_service.cartChanged$.subscribe((new_cart) => {
      this.count = this.dish_service.numberInCart(this.item.id);
    });

    this.currency = this.dish_service.getCurrercy();
    this.dish_service.currencyChanged$.subscribe((c) => (this.currency = c));

    this.auth.userChanged$.subscribe((s) => (this.user = s.role));
    this.user = this.auth.getInfo().role;
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

  showDetails() {
    console.log(this.user);
    if (this.user != AuthState.Stranger) {
      this.router.navigate([`/menu/${this.item.id}`]);
    }
  }

  ngAfterContentInit(): void {
    this.user = this.auth.getInfo().role;
  }

  get authState(): typeof AuthState {
    return AuthState;
  }
}
