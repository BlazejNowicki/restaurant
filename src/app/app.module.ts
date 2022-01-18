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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AccountManagmentComponent } from './account-managment/account-managment.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { MenuEditorComponent } from './menu-editor/menu-editor.component';
import { ItemEditComponent } from './item-edit/item-edit.component';

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
    ReviewsComponent,
    PageNotFoundComponent,
    AccountManagmentComponent,
    NewUserFormComponent,
    AdminViewComponent,
    MenuEditorComponent,
    ItemEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule,
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
