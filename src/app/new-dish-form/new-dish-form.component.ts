import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';

@Component({
  selector: 'app-new-dish-form',
  templateUrl: './new-dish-form.component.html',
  styleUrls: ['./new-dish-form.component.css'],
})
export class NewDishFormComponent {
  form_values: DishTemplate | null = null;

  dishForm = this.fb.group({
    name: ['', Validators.required],
    cusine: ['', Validators.required],
    categories: [''],
    ingredients: [''],
    maximum_per_day: [10, [Validators.min(1), Validators.max(1000)]],
    price: [5, [Validators.min(1), Validators.max(1000)]],
    description: [''],
    pictures: [''],
  });

  constructor(
    private fb: FormBuilder,
    private dish_service: DishManagmentService
  ) {}

  ngOnInit(): void {
    this.dish_service.dataChenged$.subscribe((data) => {
      this.form_values = data;
      this.dishForm.controls['name'].setValue(data.name);
      this.dishForm.controls['cusine'].setValue(data.cuisine);
      this.dishForm.controls['categories'].setValue(data.categories);
      this.dishForm.controls['ingredients'].setValue(data.ingredients);
      this.dishForm.controls['description'].setValue(data.description);
      this.dishForm.controls['pictures'].setValue(data.pictures);
      this.dishForm.controls['price'].setValue(data.price);
      this.dishForm.controls['maximum_per_day'].setValue(data.maximum_per_day);
    });
  }

  onSubmit(): void {
    console.log(this.dishForm.value);
    let tmp = this.dishForm.value;
    console.log(tmp);
    this.dish_service.addToMenu(
      tmp.name,
      tmp.cusine,
      (typeof tmp.categories === 'string')?tmp.categories.trim().split(','):tmp.categories,
      (typeof tmp.ingredients === 'string')?tmp.ingredients.trim().split(','):tmp.ingredients,
      tmp.maximum_per_day,
      tmp.price,
      tmp.description,
      (typeof tmp.pictures === 'string')?tmp.pictures.trim().split(','):tmp.pictures
    );
    this.dishForm.reset();
  }
}
