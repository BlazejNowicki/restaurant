import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Review, ReviewManagmentService } from '../review-managment.service';

@Component({
  selector: 'app-new-review-form',
  templateUrl: './new-review-form.component.html',
  styleUrls: ['./new-review-form.component.css'],
})
export class NewReviewFormComponent implements OnInit {
  id: string;
  showerror: boolean = false;

  reviewForm = this.fb.group({
    nick: ['', Validators.required],
    title: ['', Validators.required],
    body: [
      '',
      [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(500),
      ],
    ],
    date: [''],
  });

  constructor(private fb: FormBuilder, private reviewService: ReviewManagmentService, private _Activatedroute: ActivatedRoute) {
    this.id = _Activatedroute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {}

  get nick(){
    return this.reviewForm.get('nick');
  }

  get title(){
    return this.reviewForm.get('title');
  }

  get body(){
    return this.reviewForm.get('body');
  }

  onSubmit(): void{
    console.log(this.reviewForm.value);
    let tmp = this.reviewForm.value;
    console.log(tmp.date);
    let new_review = {
      dishId: this.id,
      nick: tmp.nick,
      title: tmp.title,
      body: tmp.body,
    } as Review;
    if (tmp.date){
      new_review.date = new Date(tmp.date);
    }
    this.reviewService.addReview(new_review)
    this.reviewForm.reset();
  }

  onClickvalidate(){
    let temp=this.reviewForm.get('body')!.value;

     if(temp.length>= 50 && temp.length <= 500){
    this.showerror=false;
  }
  else{
    this.showerror=true;
  }
}
}
