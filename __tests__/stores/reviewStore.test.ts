import { ReviewStore } from "@/stores/reviewStore";

import {
  mockReview,
  mockReview2,
  mockReviews,
} from "@tests/__mocks__/reviews.mock";

describe("ReviewStore", () => {
  let store: ReviewStore;

  beforeEach(() => {
    store = new ReviewStore({
      reviews: mockReviews,
      currentReview: mockReview,
    });
  });

  it("should initialize with first review", () => {
    const state = store.getState();

    expect(state.reviews).toEqual(mockReviews);
    expect(state.currentReview).toEqual(mockReview);
  });

  it("should set current review", () => {
    const secondReview = mockReview2;

    store.setCurrentReview(secondReview);

    expect(store.get("currentReview")).toEqual(secondReview);
  });

  it("should notify listeners when current review changes", () => {
    const listener = jest.fn();

    store.subscribe("currentReview", listener);
    store.setCurrentReview(mockReview2);

    expect(listener).toHaveBeenCalledWith(mockReview2);
  });
});
