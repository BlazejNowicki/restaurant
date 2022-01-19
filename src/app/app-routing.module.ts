import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { DishesComponent } from './dishes/dishes.component';
import { NewDishFormComponent } from './new-dish-form/new-dish-form.component';
import { DetailedViewComponent } from './detailed-view/detailed-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountManagmentComponent } from './account-managment/account-managment.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { MenuEditorComponent } from './menu-editor/menu-editor.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'cart', component: CartComponent, canActivate:[AuthGuard]},
  { path: 'menu', component: DishesComponent },
  { path: 'menu/:id', component: DetailedViewComponent, canActivate:[AuthGuard] },
  { path: 'dishes-manager', component: MenuEditorComponent, canActivate:[AuthGuard] },
  { path: 'account', component: AccountManagmentComponent},
  { path: 'admin-view', component: AdminViewComponent, canActivate:[AuthGuard] },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
