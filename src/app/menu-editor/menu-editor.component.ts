import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';

@Component({
  selector: 'app-menu-editor',
  templateUrl: './menu-editor.component.html',
  styleUrls: ['./menu-editor.component.css']
})
export class MenuEditorComponent implements OnInit, OnDestroy {
  menuSubscription: Subscription | null = null;
  dishes: DishTemplate[] = [];
  edit_data: DishTemplate | null = null;

  constructor(private dish_managment: DishManagmentService) { }

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
      });
  }

  ngOnDestroy(): void {
      this.menuSubscription?.unsubscribe();
  }

  editItem(data: DishTemplate){
  }
}
