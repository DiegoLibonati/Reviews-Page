import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { mockReviews } from "@tests/jest.constants";

import { ReviewPage } from "@src/pages/ReviewPage/ReviewPage";

import { reviewStore } from "@src/stores/reviewStore";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = ReviewPage();
  document.body.appendChild(container);

  return {
    container: container,
  };
};

describe("ReviewPage.ts", () => {
  beforeEach(() => {
    reviewStore.setReviews(mockReviews);
    reviewStore.setCurrentReview(mockReviews[0]);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should create a main element", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.tagName).toBe("MAIN");
    });

    test("It should have correct styling classes", () => {
      const { container } = renderComponent();

      expect(container.className).toContain("w-screen");
      expect(container.className).toContain("h-screen");
      expect(container.className).toContain("bg-background");
    });

    test("It should render section with review-wrapper class", () => {
      const { container } = renderComponent();

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
      expect(section?.classList.contains("review-wrapper")).toBe(true);
    });

    test("It should have centered layout classes on section", () => {
      const { container } = renderComponent();

      const section = container.querySelector("section");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });
  });

  describe("Initial review rendering", () => {
    test("It should render initial review from store", () => {
      renderComponent();

      const reviewElement = document.querySelector(".review");
      expect(reviewElement).toBeInTheDocument();
    });

    test("It should render review with correct initial data", () => {
      renderComponent();

      const nameElement = screen.getByText(mockReviews[0].name);
      const positionElement = screen.getByText(mockReviews[0].position);
      const descriptionElement = screen.getByText(mockReviews[0].description);

      expect(nameElement).toBeInTheDocument();
      expect(positionElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();
    });

    test("It should render review image with correct src", () => {
      renderComponent();

      const image = document.querySelector<HTMLImageElement>("#image");
      expect(image?.src).toBe(mockReviews[0].imgSrc);
    });

    test("It should render review inside review-wrapper", () => {
      const { container } = renderComponent();

      const reviewWrapper = container.querySelector(".review-wrapper");
      const review = reviewWrapper?.querySelector(".review");

      expect(review).toBeInTheDocument();
    });
  });

  describe("Review navigation and reactivity", () => {
    test("It should update review when next button is clicked", async () => {
      renderComponent();

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      await user.click(nextButton);

      const nameElement = screen.getByText(mockReviews[1].name);
      expect(nameElement).toBeInTheDocument();
    });

    test("It should update review when prev button is clicked", async () => {
      reviewStore.setCurrentReview(mockReviews[1]);
      renderComponent();

      const prevButton = screen.getByRole("button", {
        name: /btn prev review/i,
      });
      await user.click(prevButton);

      const nameElement = screen.getByText(mockReviews[0].name);
      expect(nameElement).toBeInTheDocument();
    });

    test("It should update all review fields when navigating", async () => {
      renderComponent();

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      await user.click(nextButton);

      const nameElement = screen.getByText(mockReviews[1].name);
      const positionElement = screen.getByText(mockReviews[1].position);
      const descriptionElement = screen.getByText(mockReviews[1].description);
      const image = document.querySelector<HTMLImageElement>("#image");

      expect(nameElement).toBeInTheDocument();
      expect(positionElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();
      expect(image?.src).toBe(mockReviews[1].imgSrc);
    });

    test("It should replace previous review content when navigating", async () => {
      renderComponent();

      expect(screen.getByText(mockReviews[0].name)).toBeInTheDocument();

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      await user.click(nextButton);

      expect(screen.queryByText(mockReviews[0].name)).not.toBeInTheDocument();
      expect(screen.getByText(mockReviews[1].name)).toBeInTheDocument();
    });

    test("It should handle surprise me button click", async () => {
      const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0.99);

      renderComponent();

      const surpriseButton = screen.getByRole("button", {
        name: /btn random review/i,
      });
      await user.click(surpriseButton);

      const reviewElement = document.querySelector(".review");
      expect(reviewElement).toBeInTheDocument();

      mathRandomSpy.mockRestore();
    });
  });

  describe("Store subscription", () => {
    test("It should react to store changes", () => {
      renderComponent();

      expect(screen.getByText(mockReviews[0].name)).toBeInTheDocument();

      reviewStore.setCurrentReview(mockReviews[2]);

      expect(screen.getByText(mockReviews[2].name)).toBeInTheDocument();
      expect(screen.queryByText(mockReviews[0].name)).not.toBeInTheDocument();
    });

    test("It should update review when store changes externally", () => {
      renderComponent();

      const initialName = screen.getByText(mockReviews[0].name);
      expect(initialName).toBeInTheDocument();

      reviewStore.setCurrentReview(mockReviews[1]);

      const updatedName = screen.getByText(mockReviews[1].name);
      expect(updatedName).toBeInTheDocument();
    });

    test("It should maintain only one review element in wrapper", async () => {
      const { container } = renderComponent();

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      await user.click(nextButton);
      await user.click(nextButton);

      const reviewWrapper = container.querySelector(".review-wrapper");
      const reviews = reviewWrapper?.querySelectorAll(".review");

      expect(reviews?.length).toBe(1);
    });
  });

  describe("Multiple navigation sequences", () => {
    test("It should handle full navigation cycle", async () => {
      renderComponent();

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });

      await user.click(nextButton);
      expect(screen.getByText(mockReviews[1].name)).toBeInTheDocument();

      await user.click(nextButton);
      expect(screen.getByText(mockReviews[2].name)).toBeInTheDocument();

      await user.click(nextButton);
      expect(screen.getByText(mockReviews[0].name)).toBeInTheDocument();
    });

    test("It should handle backward navigation cycle", async () => {
      renderComponent();

      const prevButton = screen.getByRole("button", {
        name: /btn prev review/i,
      });

      await user.click(prevButton);
      expect(screen.getByText(mockReviews[2].name)).toBeInTheDocument();

      await user.click(prevButton);
      expect(screen.getByText(mockReviews[1].name)).toBeInTheDocument();

      await user.click(prevButton);
      expect(screen.getByText(mockReviews[0].name)).toBeInTheDocument();
    });

    test("It should handle mixed navigation", async () => {
      renderComponent();

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      const prevButton = screen.getByRole("button", {
        name: /btn prev review/i,
      });

      await user.click(nextButton);
      expect(screen.getByText(mockReviews[1].name)).toBeInTheDocument();

      await user.click(nextButton);
      expect(screen.getByText(mockReviews[2].name)).toBeInTheDocument();

      await user.click(prevButton);
      expect(screen.getByText(mockReviews[1].name)).toBeInTheDocument();

      await user.click(prevButton);
      expect(screen.getByText(mockReviews[0].name)).toBeInTheDocument();
    });
  });

  describe("Review component integration", () => {
    test("It should render Client Reviews heading", () => {
      renderComponent();

      const heading = screen.getByText("Client Reviews");
      expect(heading).toBeInTheDocument();
    });

    test("It should render all navigation buttons", () => {
      renderComponent();

      const prevButton = screen.getByRole("button", {
        name: /btn prev review/i,
      });
      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      const surpriseButton = screen.getByRole("button", {
        name: /btn random review/i,
      });

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
      expect(surpriseButton).toBeInTheDocument();
    });

    test("It should render review image", () => {
      renderComponent();

      const image = document.querySelector<HTMLImageElement>("#image");
      expect(image).toBeInTheDocument();
      expect(image?.alt).toBe("review");
    });

    test("It should render review with all required elements", () => {
      renderComponent();

      const image = document.querySelector("#image");
      const name = document.querySelector("#name");
      const position = document.querySelector("#position");
      const description = document.querySelector("#description");

      expect(image).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(position).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    test("It should handle rendering with single review", () => {
      reviewStore.setReviews([mockReviews[0]]);
      reviewStore.setCurrentReview(mockReviews[0]);

      renderComponent();

      const reviewElement = document.querySelector(".review");
      expect(reviewElement).toBeInTheDocument();
    });

    test("It should maintain wrapper structure after multiple updates", async () => {
      const { container } = renderComponent();

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });

      await user.click(nextButton);
      await user.click(nextButton);
      await user.click(nextButton);

      const reviewWrapper = container.querySelector(".review-wrapper");
      expect(reviewWrapper).toBeInTheDocument();
      expect(reviewWrapper?.classList.contains("review-wrapper")).toBe(true);
    });

    test("It should clear previous review before rendering new one", async () => {
      renderComponent();

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      await user.click(nextButton);

      const reviews = document.querySelectorAll(".review");
      expect(reviews.length).toBe(1);
    });

    test("It should handle rapid navigation clicks", async () => {
      renderComponent();

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });

      await user.click(nextButton);
      await user.click(nextButton);
      await user.click(nextButton);
      await user.click(nextButton);
      await user.click(nextButton);

      const reviewElement = document.querySelector(".review");
      expect(reviewElement).toBeInTheDocument();
    });
  });

  describe("Layout and styling", () => {
    test("It should have full screen dimensions", () => {
      const { container } = renderComponent();

      expect(container.className).toContain("w-screen");
      expect(container.className).toContain("h-screen");
    });

    test("It should have background styling", () => {
      const { container } = renderComponent();

      expect(container.className).toContain("bg-background");
    });

    test("It should center content in section", () => {
      const { container } = renderComponent();

      const section = container.querySelector("section");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });

    test("It should have full width and height section", () => {
      const { container } = renderComponent();

      const section = container.querySelector("section");
      expect(section?.className).toContain("w-full");
      expect(section?.className).toContain("h-full");
    });
  });

  describe("Accessibility", () => {
    test("It should have accessible navigation buttons", () => {
      renderComponent();

      const prevButton = screen.getByRole("button", {
        name: /btn prev review/i,
      });
      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      const surpriseButton = screen.getByRole("button", {
        name: /btn random review/i,
      });

      expect(prevButton).toHaveAttribute("aria-label");
      expect(nextButton).toHaveAttribute("aria-label");
      expect(surpriseButton).toHaveAttribute("aria-label");
    });

    test("It should have alt text on review image", () => {
      renderComponent();

      const image = document.querySelector<HTMLImageElement>("#image");
      expect(image?.alt).toBe("review");
    });

    test("It should have semantic HTML structure", () => {
      const { container } = renderComponent();

      expect(container.tagName).toBe("MAIN");
      expect(container.querySelector("section")).toBeInTheDocument();
    });
  });

  describe("Performance and memory", () => {
    test("It should replace children efficiently without memory leaks", async () => {
      const { container } = renderComponent();
      const reviewWrapper = container.querySelector(".review-wrapper");

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });

      await user.click(nextButton);
      const childrenAfterFirstClick = reviewWrapper?.children.length;

      await user.click(nextButton);
      const childrenAfterSecondClick = reviewWrapper?.children.length;

      expect(childrenAfterFirstClick).toBe(childrenAfterSecondClick);
    });

    test("It should maintain single subscription to store", () => {
      renderComponent();

      const state = reviewStore.getState();
      reviewStore.setCurrentReview(mockReviews[1]);
      reviewStore.setCurrentReview(mockReviews[2]);
      reviewStore.setCurrentReview(mockReviews[0]);

      const reviews = document.querySelectorAll(".review");
      expect(reviews.length).toBe(1);
    });
  });
});
