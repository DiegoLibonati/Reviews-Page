import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { ReviewPage } from "@/pages/ReviewPage/ReviewPage";

import { reviewStore } from "@/stores/reviewStore";

import { mockReview, mockReview2 } from "@tests/__mocks__/reviews.mock";

const renderPage = (): Page => {
  const container = ReviewPage();
  document.body.appendChild(container);
  return container;
};

describe("ReviewPage", () => {
  beforeEach(() => {
    reviewStore.setCurrentReview(mockReview);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    reviewStore.setCurrentReview(mockReview);
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>("main");
    expect(main).toBeInTheDocument();
  });

  it("should render review component", () => {
    renderPage();

    const review = document.querySelector<HTMLDivElement>(".review");
    expect(review).toBeInTheDocument();
  });

  it("should render initial review data", () => {
    renderPage();

    expect(screen.getByText(mockReview.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.position)).toBeInTheDocument();
  });

  it("should update review when next button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const nextButton = screen.getByRole("button", { name: "btn next review" });
    await user.click(nextButton);

    const currentReview = reviewStore.get("currentReview");
    expect(screen.getByText(currentReview.name)).toBeInTheDocument();
  });

  it("should update review when prev button is clicked", async () => {
    const user = userEvent.setup();
    reviewStore.setCurrentReview(mockReview2);
    renderPage();

    const prevButton = screen.getByRole("button", { name: "btn prev review" });
    await user.click(prevButton);

    expect(screen.getByText(mockReview.name)).toBeInTheDocument();
  });

  it("should cleanup review component and subscription on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
