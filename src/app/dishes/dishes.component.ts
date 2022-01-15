import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Currency, DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
  providers: [],
})
export class DishesComponent implements OnInit, OnDestroy {
  dishes: DishTemplate[] = [];
  selection: DishTemplate[] = [];
  currency: Currency = Currency.Dolar;

  most_expensive_price: number = 0;
  cheapest_price: number = 0;

  page_size: number = 5;
  page: number = 0;
  sizes: number[] = [5, 10, 15];
  show_next: boolean = false;

  menuSubscription: Subscription | null = null;

  constructor(private dish_managment: DishManagmentService) {}

  ngOnInit(): void {
    this.getDishes();
  }

  getDishes() {
    this.menuSubscription = this.dish_managment
      .getMenu()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map(
            (c) =>
              ({
                id: c.payload.doc.id,
                ...c.payload.doc.data(),
              } as DishTemplate)
          )
        )
      )
      .subscribe((data) => {
        this.dishes = data;
        console.log(data);
        this.refreshPage();
      });
  }

  find_most_least_expensive() {
    this.most_expensive_price = this.dishes.reduce(function (a, b) {
      return Math.max(a, b.price);
    }, 0);

    this.cheapest_price = this.dishes.reduce(function (a, b) {
      return Math.min(a, b.price);
    }, 1000);
  }

  prev() {
    this.page -= 1;
    this.refreshPage();
  }

  next() {
    this.page += 1;
    this.refreshPage();
  }

  refreshPage() {
    this.find_most_least_expensive();
    this.show_next = (this.page + 1) * this.page_size < this.dishes.length;
    this.selection = this.dishes.slice(
      this.page * this.page_size,
      (this.page + 1) * this.page_size
    );
  }

  onPageSizeChange(deviceValue: any) {
    console.log(deviceValue);
    this.page_size = parseInt(deviceValue.target.value);
    console.log(this.page_size);
    this.page = 0;
    this.refreshPage();
  }

  ngOnDestroy(): void {
    if (this.menuSubscription) this.menuSubscription.unsubscribe();
  }
}
