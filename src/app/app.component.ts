import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import { AuthService, AuthState } from './auth.service';
import { DishManagmentService } from './dish-managment.service';
import { MockDataService } from './mock-data.service';

export interface DishTemplate {
  id: string;
  name: string;
  cuisine: string;
  categories?: string[];
  ingredients?: string[];
  maximum_per_day: number;
  price: number;
  description?: string;
  pictures: string[];
}

export enum Currency {
  Euro = 'euro',
  Dolar = 'dolar',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'restaurant';
  currency = Currency.Dolar;
  dishes: DishTemplate[] = [];
  currentUrl: String;
  event$;
  userState = AuthState.Stranger;

  constructor(
    private dish_service: DishManagmentService,
    private router: Router,
    private auth: AuthService
  ) {
    this.currentUrl = this.router.url;

    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.currentUrl = event.url;
        console.log(this.currentUrl);
      }
    });
  }

  ngOnInit(): void {
    console.log("in component constuctor");
    this.auth.userChanged$.subscribe((s) => (this.userState = s));
  }

  ngOnDestroy(): void {
    this.event$.unsubscribe();
  }

  euroSelected() {
    this.dish_service.setCurrency(Currency.Euro);
  }

  dolarSelected() {
    this.dish_service.setCurrency(Currency.Dolar);
  }

  get authState(): typeof AuthState {
    return AuthState;
  }

  logOut() {
    this.auth
      .logout()
      .then(() => {
        this.auth.stateChanged();
        this.router.navigate(['home']);
      })
      .catch((err) => console.log(err));
  }
}
