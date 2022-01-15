import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';

export interface Reaction {
  dishId: string;
  likes: number;
  dislikes: number;
}

export interface Review {
  dishId: string;
  nick: string;
  title: string;
  body: string;
  date?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewManagmentService {
  dbReactionPath = 'reactions';
  dbReviewPath = 'reviews';
  reactionRef: AngularFirestoreCollection<any>;
  reviewRef: AngularFirestoreCollection<any>;
  likes: Reaction[] = [];
  reviews: Review[] = [];

  cache: Map<string, number> = new Map();
  private reaction_changed = new Subject<Reaction[]>();
  private review_added = new Subject<Review[]>();
  reactionChanged$ = this.reaction_changed.asObservable();
  reviewAdded$ = this.review_added.asObservable();

  setCache(id: string, value: number) {
    if (value == 0) {
      this.cache.delete(id);
    } else if (value == -1 || value == 1) {
      this.cache.set(id, value);
    }
    console.log(this.cache);
  }

  getCache(id: string) {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
    return 0;
  }

  // getReviewsById(id: string): Review[] {
  //   return this.reviews.filter((i) => i.dishId == id);
  // }

  getReactionById(id: string): Reaction {
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
    // this.reviews.push(review);
    // this.review_added.next(this.reviews);
    if (review.date) {
      console.log("date is ok");
      this.reviewRef
        .add({ ...review, date: Timestamp.fromDate(review.date!) })
        .then(
          (res) => {},
          (err) => console.log(err)
        );
    } else {
      console.log("date is not ok");
      this.reviewRef
        .add({ ...review})
        .then(
          (res) => {},
          (err) => console.log(err)
        );
    }
  }

  addLike(id: string) {
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

  removeLike(id: string) {
    let index = this.likes.findIndex((i) => i.dishId == id);
    if (index >= 0) {
      this.likes[index].likes -= 1;
      this.likes[index].likes = Math.max(0, this.likes[index].likes);
      this.likes = this.likes.filter((i) => i.likes != 0 || i.dislikes != 0);
    }
    console.log(this.likes);
    this.reaction_changed.next(this.likes);
  }

  removeDislike(id: string) {
    let index = this.likes.findIndex((i) => i.dishId == id);
    if (index >= 0) {
      this.likes[index].dislikes += 1;
      this.likes[index].dislikes = Math.max(0, this.likes[index].dislikes);
      this.likes = this.likes.filter((i) => i.likes != 0 || i.dislikes != 0);
    }
    this.reaction_changed.next(this.likes);
  }

  addDislike(id: string) {
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

  dishDeleted(id: string) {
    this.reviews = this.reviews.filter((i) => i.dishId != id);
    this.likes = this.likes.filter((i) => i.dishId != id);
    this.review_added.next(this.reviews);
    this.reaction_changed.next(this.likes);
  }

  constructor(private firestore: AngularFirestore) {
    this.reactionRef = this.firestore.collection(this.dbReactionPath);
    this.reviewRef = this.firestore.collection(this.dbReviewPath);
  }

  getReactionsById(id: string) {
    return this.reactionRef.doc(id);
  }

  getReactions() {
    return this.reactionRef;
  }

  getReviews() {
    return this.reviewRef;
  }

  updateReaction(reaction: Reaction) {
    this.reactionRef
      .doc(reaction.dishId)
      .update({ likes: reaction.likes, dislikes: reaction.dislikes });
  }
}
