import { Review } from "@src/entities/app";

export type ReviewState = {
  reviews: Review[];
  currentReview: Review;
};
