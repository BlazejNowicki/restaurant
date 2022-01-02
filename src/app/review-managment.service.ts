import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

export interface Reaction {
  dishId: number;
  likes: number;
  dislikes: number;
}

export interface Review {
  dishId: number;
  nick: string;
  title: string;
  body: string;
  date?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewManagmentService {
  likes: Reaction[] = [
    { dishId: 1, likes: 10, dislikes: 2 },
    { dishId: 2, likes: 15, dislikes: 4 },
  ];
  reviews: Review[] = [
    {
      dishId: 1,
      nick: "Niewybrednysmakosz69",
      title: "Moja ulubiona",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni corporis molestias delectus asperiores ullam rerum veniam! Repellendus esse harum modi ipsam, doloremque atque ipsa cumque minima facere officiis aut delectus rerum illo ad repudiandae voluptatem quo, tempore, itaque nisi omnis accusamus quod debitis magni sapiente. Quisquam reiciendis velit, illo suscipit sunt necessitatibus id? Aliquam hic voluptate quaerat maxime repellat omnis",
      date: new Date(2021, 12, 24)
    }
  ];
  cache: Map<number, number> = new Map();
  private reaction_changed = new Subject<Reaction[]>();
  private review_added = new Subject<Review[]>();
  reactionChanged$ = this.reaction_changed.asObservable();
  reviewAdded$ = this.review_added.asObservable();

  setCache(id: number, value: number) {
    if (value == 0) {
      this.cache.delete(id);
    } else if (value == -1 || value == 1) {
      this.cache.set(id, value);
    }
    console.log(this.cache);
  }

  getCache(id: number) {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
    return 0;
  }

  getReviewsById(id: number): Review[] {
    return this.reviews.filter((i) => i.dishId == id);
  }

  getReactionById(id: number): Reaction {
    let ans: Array<Reaction> = this.likes.filter((i) => i.dishId == id);
    if (ans.length > 0) {
      return ans[0];
    } else {
      return {
        dishId: id,
        likes: 0,
        dislikes: 0,
      };
    }
  }

  addReview(review: Review): void {
    this.reviews.push(review);
    this.review_added.next(this.reviews);
  }

  addLike(id: number) {
    let index = this.likes.findIndex((i) => i.dishId == id);
    if (index >= 0) {
      this.likes[index].likes += 1;
    } else {
      this.likes.push({
        dishId: id,
        likes: 1,
        dislikes: 0,
      });
    }
    console.log(this.likes);
    this.reaction_changed.next(this.likes);
  }

  removeLike(id: number) {
    let index = this.likes.findIndex((i) => i.dishId == id);
    if (index >= 0) {
      this.likes[index].likes -= 1;
      this.likes[index].likes = Math.max(0, this.likes[index].likes);
      this.likes = this.likes.filter((i) => i.likes != 0 || i.dislikes != 0);
    }
    console.log(this.likes);
    this.reaction_changed.next(this.likes);
  }

  removeDislike(id: number) {
    let index = this.likes.findIndex((i) => i.dishId == id);
    if (index >= 0) {
      this.likes[index].dislikes += 1;
      this.likes[index].dislikes = Math.max(0, this.likes[index].dislikes);
      this.likes = this.likes.filter((i) => i.likes != 0 || i.dislikes != 0);
    }
    this.reaction_changed.next(this.likes);
  }

  addDislike(id: number) {
    let index = this.likes.findIndex((i) => i.dishId == id);
    if (index >= 0) {
      this.likes[index].dislikes += 1;
    } else {
      this.likes.push({
        dishId: id,
        likes: 0,
        dislikes: 1,
      });
    }
    this.reaction_changed.next(this.likes);
  }

  dishDeleted(id: number) {
    this.reviews = this.reviews.filter((i) => i.dishId != id);
    this.likes = this.likes.filter((i) => i.dishId != id);
    this.review_added.next(this.reviews);
    this.reaction_changed.next(this.likes);
  }

  constructor() {}
}
