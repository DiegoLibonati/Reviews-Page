import { ReviewState } from "@src/entities/states";
import { Review } from "@src/entities/app";

import { Store } from "@src/stores/store";

import reviews from "@src/constants/reviews";

export class ReviewStore extends Store<ReviewState> {
  constructor(initialState: ReviewState) {
    super(initialState);
  }

  public setCurrentReview(review: Review): void {
    this.setState({ currentReview: review });
  }

  public setReviews(reviews: Review[]): void {
    this.setState({ reviews });
  }
}

export const reviewStore = new ReviewStore({
  reviews: reviews,
  currentReview: reviews[0],
});
