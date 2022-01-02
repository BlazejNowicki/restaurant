import { Component, Input, OnDestroy } from '@angular/core';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import { DishManagmentService } from './dish-managment.service';
import { MockDataService } from './mock-data.service';

export interface DishTemplate {
  id: number;
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
export class AppComponent implements OnDestroy {
  title = 'restaurant';
  currency = Currency.Dolar;
  dishes: DishTemplate[] = [];
  currentUrl: String;
  event$;

  constructor(
    private dish_service: DishManagmentService,
    private mock_data: MockDataService,
    private router: Router
  ) {
    this.dishes = mock_data.getMockData();
    this.currentUrl = this.router.url;

    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.currentUrl = event.url;
        console.log(this.currentUrl);
      }
    });
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
}
