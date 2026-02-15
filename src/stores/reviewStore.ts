import type { ReviewState } from "@/types/states";
import type { Review } from "@/types/app";

import { Store } from "@/core/store";

import reviews from "@/constants/reviews";

export class ReviewStore extends Store<ReviewState> {
  // constructor(initialState: ReviewState) {
  //   super(initialState);
  // }

  public setCurrentReview(review: Review): void {
    this.setState({ currentReview: review });
  }

  public setReviews(reviews: Review[]): void {
    this.setState({ reviews });
  }
}

export const reviewStore = new ReviewStore({
  reviews: reviews,
  currentReview: reviews[0]!,
});
