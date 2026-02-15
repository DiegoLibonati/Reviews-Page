import type { Review } from "@/types/app";

export interface ReviewState extends Record<string, unknown> {
  reviews: Review[];
  currentReview: Review;
}
