import type { ReviewState } from "@/types/states";

import { ReviewStore } from "@/stores/reviewStore";

import {
  mockReviews,
  mockReview,
  mockReview2,
} from "@tests/__mocks__/reviews.mock";

const mockInitialState: ReviewState = {
  reviews: mockReviews,
  currentReview: mockReview,
};

describe("ReviewStore", () => {
  let store: ReviewStore;

  beforeEach(() => {
    store = new ReviewStore({ ...mockInitialState, reviews: [...mockReviews] });
  });

  describe("getState", () => {
    it("should return the initial currentReview", () => {
      expect(store.getState().currentReview).toEqual(mockReview);
    });

    it("should return the initial reviews array", () => {
      expect(store.getState().reviews).toEqual(mockReviews);
    });
  });

  describe("setCurrentReview", () => {
    it("should update currentReview to the given review", () => {
      store.setCurrentReview(mockReview2);
      expect(store.getState().currentReview).toEqual(mockReview2);
    });

    it("should notify subscribers when currentReview changes", () => {
      const mockListener = jest.fn();
      store.subscribe("currentReview", mockListener);
      store.setCurrentReview(mockReview2);
      expect(mockListener).toHaveBeenCalledWith(mockReview2);
    });

    it("should not notify subscribers when currentReview does not change", () => {
      const mockListener = jest.fn();
      store.subscribe("currentReview", mockListener);
      store.setCurrentReview(mockReview);
      expect(mockListener).not.toHaveBeenCalled();
    });
  });

  describe("setReviews", () => {
    it("should update the reviews array", () => {
      const mockNewReviews = [mockReview2];
      store.setReviews(mockNewReviews);
      expect(store.getState().reviews).toEqual(mockNewReviews);
    });

    it("should notify subscribers when reviews array changes", () => {
      const mockListener = jest.fn();
      store.subscribe("reviews", mockListener);
      const mockNewReviews = [mockReview2];
      store.setReviews(mockNewReviews);
      expect(mockListener).toHaveBeenCalledWith(mockNewReviews);
    });

    it("should not notify subscribers when reviews reference does not change", () => {
      const mockListener = jest.fn();
      store.subscribe("reviews", mockListener);
      store.setReviews(store.getState().reviews);
      expect(mockListener).not.toHaveBeenCalled();
    });
  });
});
