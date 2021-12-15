import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DishManagmentService } from './dish-managment.service';
import { DishesComponent } from './dishes/dishes.component';
import { ItemComponent } from './item/item.component';
import { NewDishFormComponent } from './new-dish-form/new-dish-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    ItemComponent,
    NewDishFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
