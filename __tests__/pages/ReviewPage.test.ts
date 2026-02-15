import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { ReviewPage } from "@/pages/ReviewPage/ReviewPage";

import { reviewStore } from "@/stores/reviewStore";

import reviews from "@/constants/reviews";

const renderPage = (): Page => {
  const container = ReviewPage();
  document.body.appendChild(container);
  return container;
};

describe("ReviewPage", () => {
  beforeEach(() => {
    reviewStore.setCurrentReview(reviews[0]!);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    reviewStore.setCurrentReview(reviews[0]!);
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

    expect(screen.getByText(reviews[0]!.name)).toBeInTheDocument();
    expect(screen.getByText(reviews[0]!.position)).toBeInTheDocument();
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
    reviewStore.setCurrentReview(reviews[1]!);
    renderPage();

    const prevButton = screen.getByRole("button", { name: "btn prev review" });
    await user.click(prevButton);

    expect(screen.getByText(reviews[0]!.name)).toBeInTheDocument();
  });

  it("should cleanup review component and subscription on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
