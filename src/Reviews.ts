import { Review } from "./Review";

export class Reviews {
  constructor(public reviews: Review[], public indexReview: number) {}

  addReview(review: Review): void {
    this.reviews.push(review);
    return;
  }

  addReviews(reviews: Review[]): void {
    this.reviews = reviews;
    return;
  }

  nextReview(): void {
    if (this.indexReview >= this.reviews.length - 1) {
      this.indexReview = 0;
      return;
    }
    this.indexReview += 1;
    return;
  }

  prevReview(): void {
    if (this.indexReview <= 0) {
      this.indexReview = this.reviews.length - 1;
      return;
    }
    this.indexReview -= 1;
    return;
  }

  setRandomIndex(): void {
    const randomPosition = Math.floor(Math.random() * this.reviews.length);
    this.indexReview = randomPosition;
    return;
  }
}
