import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DishManagmentService } from './dish-managment.service';
import { DishesComponent } from './dishes/dishes.component';
import { ItemComponent } from './item/item.component';
import { NewDishFormComponent } from './new-dish-form/new-dish-form.component';
import { CartComponent } from './cart/cart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    ItemComponent,
    NewDishFormComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
