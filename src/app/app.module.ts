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
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailedViewComponent } from './detailed-view/detailed-view.component';
import { NewReviewFormComponent } from './new-review-form/new-review-form.component';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    ItemComponent,
    NewDishFormComponent,
    CartComponent,
    HomeComponent,
    DetailedViewComponent,
    NewReviewFormComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
