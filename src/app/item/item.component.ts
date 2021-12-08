import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() item: DishTemplate = {
    id: 0,
    name: 'none',
    cuisine: "międzynarodowa",
    maximum_per_day: 1,
    price: 1,
    pictures: [],
  };
  @Input() count:number|undefined = 0;
  @Input() expensive = 0;
  @Input() cheap = 0;

  @Output() add_event = new EventEmitter();
  @Output() remove_event = new EventEmitter();

  constructor(private dish_service: DishManagmentService) {}

  ngOnInit(): void { }

  addItem(): void{
    this.add_event.emit(this.item);
  }

  removeItem(){
    this.remove_event.emit(this.item);
  }

  deleteItem() {
    this.dish_service.deleteSelectedDish(this.item);
  }
}
