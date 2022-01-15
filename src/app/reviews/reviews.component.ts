import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Review, ReviewManagmentService } from '../review-managment.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @Input() id: string = '-1';
  reviews: Review[] = [];
  reviewSubscripton: Subscription | null = null;

  constructor(
    private reviewService: ReviewManagmentService,
    private _Activatedroute: ActivatedRoute
  ) {
    this.id = _Activatedroute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.reviewSubscripton = this.reviewService
      .getReviews()
      .valueChanges()
      .pipe(
        map((item) => {
          return item.filter((x) => x.dishId == this.id);
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.reviews = data.map((r) => {
          if (r.date) {
            return { ...r, date: r.date.toDate() };
          } else {
            return {
              ...r,
            };
          }
        });
      });
  }

  ngOnDestroy(): void {
    if (this.reviewSubscripton) this.reviewSubscripton.unsubscribe();
  }
}
