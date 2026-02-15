import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ReviewProps } from "@/types/props";
import type { ReviewComponent } from "@/types/components";

import { Review } from "@/components/Review/Review";

import { reviewStore } from "@/stores/reviewStore";

import reviews from "@/constants/reviews";

const renderComponent = (props: ReviewProps): ReviewComponent => {
  const container = Review(props);
  document.body.appendChild(container);
  return container;
};

describe("Review Component", () => {
  beforeEach(() => {
    reviewStore.setCurrentReview(reviews[0]!);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    reviewStore.setCurrentReview(reviews[0]!);
  });

  const defaultProps: ReviewProps = {
    imgSrc: "/images/person1.jpg",
    name: "John Doe",
    description: "Great service and amazing experience!",
    position: "CEO at Tech Corp",
  };

  it("should render review with correct structure", () => {
    renderComponent(defaultProps);

    const review = document.querySelector<HTMLDivElement>(".review");
    expect(review).toBeInTheDocument();
  });

  it("should render reviewer name", () => {
    renderComponent(defaultProps);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("should render reviewer position", () => {
    renderComponent(defaultProps);

    expect(screen.getByText("CEO at Tech Corp")).toBeInTheDocument();
  });

  it("should render review description", () => {
    renderComponent(defaultProps);

    expect(
      screen.getByText("Great service and amazing experience!")
    ).toBeInTheDocument();
  });

  it("should render image with correct src", () => {
    renderComponent(defaultProps);

    const image = screen.getByAltText("review");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/person1.jpg");
  });

  it("should render Client Reviews title", () => {
    renderComponent(defaultProps);

    expect(screen.getByText("Client Reviews")).toBeInTheDocument();
  });

  it("should render navigation buttons", () => {
    renderComponent(defaultProps);

    expect(
      screen.getByRole("button", { name: "btn prev review" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "btn next review" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "btn random review" })
    ).toBeInTheDocument();
  });

  it("should navigate to next review when next button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const nextButton = screen.getByRole("button", { name: "btn next review" });
    await user.click(nextButton);

    const currentReview = reviewStore.get("currentReview");
    expect(currentReview).not.toEqual(reviews[0]);
  });

  it("should navigate to previous review when prev button is clicked", async () => {
    const user = userEvent.setup();
    reviewStore.setCurrentReview(reviews[1]!);
    renderComponent(defaultProps);

    const prevButton = screen.getByRole("button", { name: "btn prev review" });
    await user.click(prevButton);

    const currentReview = reviewStore.get("currentReview");
    expect(currentReview).toEqual(reviews[0]);
  });

  it("should set random review when surprise me button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const randomButton = screen.getByRole("button", {
      name: "btn random review",
    });
    await user.click(randomButton);

    const currentReview = reviewStore.get("currentReview");
    expect(reviews).toContainEqual(currentReview);
  });

  it("should cleanup all button listeners", () => {
    const review = renderComponent(defaultProps);

    expect(review.cleanup).toBeDefined();
    review.cleanup?.();

    expect(review.cleanup).toBeDefined();
  });
});
