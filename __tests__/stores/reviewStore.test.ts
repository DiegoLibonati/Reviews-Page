import { ReviewStore } from "@/stores/reviewStore";

import reviews from "@/constants/reviews";

describe("ReviewStore", () => {
  let store: ReviewStore;

  beforeEach(() => {
    store = new ReviewStore({
      reviews: reviews,
      currentReview: reviews[0]!,
    });
  });

  it("should initialize with first review", () => {
    const state = store.getState();

    expect(state.reviews).toEqual(reviews);
    expect(state.currentReview).toEqual(reviews[0]);
  });

  it("should set current review", () => {
    const secondReview = reviews[1]!;

    store.setCurrentReview(secondReview);

    expect(store.get("currentReview")).toEqual(secondReview);
  });

  it("should notify listeners when current review changes", () => {
    const listener = jest.fn();

    store.subscribe("currentReview", listener);
    store.setCurrentReview(reviews[1]!);

    expect(listener).toHaveBeenCalledWith(reviews[1]);
  });
});
