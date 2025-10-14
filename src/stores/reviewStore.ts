import { ReviewState } from "@src/entities/states";
import { Review } from "@src/entities/app";
import { Listener } from "@src/entities/store";

import reviews from "@src/constants/reviews";

class ReviewStore {
  private state: ReviewState;
  private listeners: {
    [K in keyof ReviewState]: Listener<ReviewState[K]>[];
  };

  constructor(initialState: ReviewState) {
    this.state = initialState;
    this.listeners = {
      reviews: [],
      currentReview: [],
    };
  }

  getState(): ReviewState {
    return this.state;
  }

  get<K extends keyof ReviewState>(key: K): ReviewState[K] {
    return this.state[key];
  }

  setState(newState: Partial<ReviewState>): void {
    const prevState = this.state;
    this.state = { ...this.state, ...newState };

    (Object.keys(newState) as (keyof ReviewState)[]).forEach(
      <K extends keyof ReviewState>(key: K) => {
        const oldValue = prevState[key];
        const newValue = this.state[key];
        if (oldValue !== newValue) {
          this.listeners[key].forEach((listener) => listener(newValue));
        }
      }
    );
  }

  subscribe<K extends keyof ReviewState>(
    key: K,
    listener: Listener<ReviewState[K]>
  ): () => void {
    this.listeners[key].push(listener);

    return () => {
      const arr = this.listeners[key];
      const filtered = arr.filter((l) => l !== listener);
      (this.listeners[key] as Listener<ReviewState[K]>[]) = filtered;
    };
  }

  setCurrentReview(review: Review): void {
    this.setState({ currentReview: review });
  }

  setReviews(reviews: Review[]): void {
    this.setState({ reviews });
  }
}

export const reviewStore = new ReviewStore({
  reviews: reviews,
  currentReview: reviews[0],
});
