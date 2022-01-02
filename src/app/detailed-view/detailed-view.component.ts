import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Currency, DishTemplate } from '../app.component';
import { DishManagmentService } from '../dish-managment.service';
import { Reaction, ReviewManagmentService } from '../review-managment.service';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css'],
})
export class DetailedViewComponent implements OnInit {
  id: number;
  item: DishTemplate;
  image_path: String;
  down = faThumbsDown;
  up = faThumbsUp;
  up_selected: boolean = false;
  down_selected: boolean = false;
  currency: Currency = Currency.Dolar;
  count: number = 0;
  reaction: Reaction;
  currentPhoto: number = 0;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private dish_service: DishManagmentService,
    private review_service: ReviewManagmentService
  ) {
    this.id = parseInt(_Activatedroute.snapshot.paramMap.get('id')!);
    this.item = this.dish_service.getDishById(this.id);
    this.image_path = this.item.pictures[this.currentPhoto];
    this.reaction = this.review_service.getReactionById(this.id);

    this.dish_service.cartChanged$.subscribe((new_cart) => {
      this.count = this.dish_service.numberInCart(this.item.id);
    });

    this.review_service.reactionChanged$.subscribe((t) => {
      this.reaction = this.review_service.getReactionById(this.id);
    });

    this.currency = this.dish_service.getCurrercy();
    this.dish_service.currencyChanged$.subscribe((c) => (this.currency = c));
  }

  ngOnInit(): void {
    this.count = this.dish_service.numberInCart(this.item.id);
    let cache = this.review_service.getCache(this.id);
    if (cache == 1) {
      this.up_selected = true;
    } else if (cache == -1) {
      this.down_selected = true;
    }
  }

  addToCart(): void {
    this.dish_service.addToCart(this.item.id);
  }

  removeFromCart(): void {
    this.dish_service.removeFromCart(this.item.id);
  }

  upPressed(): void {
    if (this.up_selected) {
      this.review_service.removeLike(this.item.id);
    } else {
      this.review_service.addLike(this.item.id);
    }
    this.up_selected = !this.up_selected;
    if (this.down_selected) {
      this.review_service.removeDislike(this.item.id);
    }
    this.down_selected = false;

    this.updateCache();
  }

  downPressed(): void {
    if (this.down_selected) {
      this.review_service.removeDislike(this.item.id);
    } else {
      this.review_service.addDislike(this.item.id);
    }
    this.down_selected = !this.down_selected;
    if (this.up_selected) {
      this.review_service.removeLike(this.item.id);
    }
    this.up_selected = false;

    this.updateCache();
  }

  updateCache() {
    if (this.up_selected) {
      this.review_service.setCache(this.id, 1);
    } else if (this.down_selected) {
      this.review_service.setCache(this.id, -1);
    } else {
      this.review_service.setCache(this.id, 0);
    }
  }

  nextPhoto(){
    this.currentPhoto += 1;
    this.image_path = this.item.pictures[this.currentPhoto];
  }

  prevPhoto(){
    this.currentPhoto -= 1;
    this.image_path = this.item.pictures[this.currentPhoto];
  }
}