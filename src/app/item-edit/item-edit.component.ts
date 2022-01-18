import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  @Input() item: DishTemplate = {
    id: '0',
    name: 'none',
    cuisine: 'międzynarodowa',
    maximum_per_day: 1,
    price: 1,
    pictures: [],
  };

  constructor(private dish_managment: DishManagmentService) { }

  ngOnInit(): void {
  }

  delete(){
    this.dish_managment.removeFromMenu(this.item.id);
  }

  edit(){
    this.dish_managment.dataToEdit(this.item);
    this.dish_managment.removeFromMenu(this.item.id);
  }
}
