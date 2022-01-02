import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review, ReviewManagmentService } from '../review-managment.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input() id: number = -1;
  reviews: Review[];

  constructor(private reviewService: ReviewManagmentService, private _Activatedroute: ActivatedRoute) {
    console.log(this.id);
    this.id = parseInt(_Activatedroute.snapshot.paramMap.get('id')!);
    this.reviews = this.reviewService.getReviewsById(this.id);

    this.reviewService.reviewAdded$.subscribe(e => {
      this.reviews = this.reviewService.getReviewsById(this.id);
    })
  }

  ngOnInit(): void {
  }

}
