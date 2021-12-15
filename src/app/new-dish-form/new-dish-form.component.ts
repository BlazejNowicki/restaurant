import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DishManagmentService } from '../dish-managment.service';

@Component({
  selector: 'app-new-dish-form',
  templateUrl: './new-dish-form.component.html',
  styleUrls: ['./new-dish-form.component.css']
})
export class NewDishFormComponent {
  dishForm = this.fb.group({
    name: ['', Validators.required],
    cusine: ['', Validators.required],
    maximum_per_day: [10, [Validators.min(1), Validators.max(1000)]],
    price: [5, [Validators.min(1), Validators.max(1000)]],
  })

  constructor(private fb: FormBuilder, private dish_service: DishManagmentService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.dishForm.value);
    this.dish_service.createNewDish(this.dishForm.value);
    this.dishForm.reset();
  }

}
