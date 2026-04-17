import { screen } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import GlimpsedPage from "@/pages/GlimpsedPage/GlimpsedPage";

import { reviewStore } from "@/stores/reviewStore";

import {
  mockReviews,
  mockReview,
  mockReview2,
} from "@tests/__mocks__/reviews.mock";

let page: Page | null = null;

const renderPage = (): Page => {
  const element = GlimpsedPage();
  document.body.appendChild(element);
  return element;
};

describe("GlimpsedPage", () => {
  beforeEach(() => {
    reviewStore.setState({ reviews: mockReviews, currentReview: mockReview });
  });

  afterEach(() => {
    page?.cleanup?.();
    page = null;
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a main element", () => {
      page = renderPage();
      expect(document.querySelector<HTMLElement>("main")).toBeInTheDocument();
    });

    it("should render the review wrapper section", () => {
      page = renderPage();
      expect(
        document.querySelector<HTMLElement>(".review-wrapper")
      ).toBeInTheDocument();
    });

    it("should render the name from the current review", () => {
      page = renderPage();
      expect(screen.getByText(mockReview.name)).toBeInTheDocument();
    });

    it("should render the position from the current review", () => {
      page = renderPage();
      expect(screen.getByText(mockReview.position)).toBeInTheDocument();
    });

    it("should render the description from the current review", () => {
      page = renderPage();
      expect(screen.getByText(mockReview.description)).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should render the new review when the store's currentReview changes", () => {
      page = renderPage();
      reviewStore.setCurrentReview(mockReview2);
      expect(screen.getByText(mockReview2.name)).toBeInTheDocument();
      expect(screen.queryByText(mockReview.name)).not.toBeInTheDocument();
    });

    it("should replace the old review component on each store update", () => {
      page = renderPage();
      reviewStore.setCurrentReview(mockReview2);
      reviewStore.setCurrentReview(mockReview);
      expect(screen.getByText(mockReview.name)).toBeInTheDocument();
      expect(screen.queryByText(mockReview2.name)).not.toBeInTheDocument();
    });
  });

  describe("cleanup", () => {
    it("should stop updating the DOM after cleanup", () => {
      page = renderPage();
      page.cleanup?.();
      reviewStore.setCurrentReview(mockReview2);
      expect(screen.queryByText(mockReview2.name)).not.toBeInTheDocument();
      expect(screen.getByText(mockReview.name)).toBeInTheDocument();
    });
  });
});
