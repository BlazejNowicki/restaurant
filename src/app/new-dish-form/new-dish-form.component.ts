import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DishManagmentService } from '../dish-managment.service';

@Component({
  selector: 'app-new-dish-form',
  templateUrl: './new-dish-form.component.html',
  styleUrls: ['./new-dish-form.component.css'],
})
export class NewDishFormComponent {
  dishForm = this.fb.group({
    name: ['', Validators.required],
    cusine: ['', Validators.required],
    categories: ['', Validators.required],
    ingredients: ['', Validators.required],
    maximum_per_day: [10, [Validators.min(1), Validators.max(1000)]],
    price: [5, [Validators.min(1), Validators.max(1000)]],
    description: ['', Validators.required],
    pictures: [''],
  });

  constructor(
    private fb: FormBuilder,
    private dish_service: DishManagmentService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.dishForm.value);
    let tmp = this.dishForm.value;
    this.dish_service.addToMenu(
      tmp.name,
      tmp.cusine,
      tmp.categories.trim().split(','),
      tmp.ingredients.trim().split(','),
      tmp.maximum_per_day,
      tmp.price,
      tmp.description,
      tmp.pictures.trim().split(',')
    );
    this.dishForm.reset();
  }
}
