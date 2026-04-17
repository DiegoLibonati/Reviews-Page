import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ReviewProps } from "@/types/props";
import type { ReviewComponent } from "@/types/components";

import Review from "@/components/Review/Review";

import { reviewStore } from "@/stores/reviewStore";

import { mockReviews, mockReview } from "@tests/__mocks__/reviews.mock";

const defaultProps: ReviewProps = {
  imgSrc: mockReview.imgSrc,
  name: mockReview.name,
  position: mockReview.position,
  description: mockReview.description,
};

const renderComponent = (props: Partial<ReviewProps> = {}): ReviewComponent => {
  const element = Review({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Review", () => {
  beforeEach(() => {
    reviewStore.setState({ reviews: mockReviews, currentReview: mockReview });
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render the review container", () => {
      renderComponent();
      expect(
        document.querySelector<HTMLDivElement>(".review")
      ).toBeInTheDocument();
    });

    it("should render the reviewer name", () => {
      renderComponent();
      expect(screen.getByText(mockReview.name)).toBeInTheDocument();
    });

    it("should render the reviewer position", () => {
      renderComponent();
      expect(screen.getByText(mockReview.position)).toBeInTheDocument();
    });

    it("should render the reviewer description", () => {
      renderComponent();
      expect(screen.getByText(mockReview.description)).toBeInTheDocument();
    });

    it("should render the reviewer image with the correct src", () => {
      renderComponent();
      const img = document.querySelector<HTMLImageElement>("#image");
      expect(img).toHaveAttribute("src", mockReview.imgSrc);
    });

    it("should render the previous review button", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Previous review" })
      ).toBeInTheDocument();
    });

    it("should render the next review button", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Next review" })
      ).toBeInTheDocument();
    });

    it("should render the surprise me button", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Surprise me - show random review" })
      ).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    describe("next button", () => {
      it("should advance currentReview to the next one in the array", async () => {
        renderComponent();
        const user = userEvent.setup();
        await user.click(screen.getByRole("button", { name: "Next review" }));
        expect(reviewStore.get("currentReview")).toEqual(mockReviews[1]);
      });

      it("should wrap to the first review when at the last one", async () => {
        reviewStore.setState({
          currentReview: mockReviews[mockReviews.length - 1]!,
        });
        renderComponent();
        const user = userEvent.setup();
        await user.click(screen.getByRole("button", { name: "Next review" }));
        expect(reviewStore.get("currentReview")).toEqual(mockReviews[0]);
      });
    });

    describe("previous button", () => {
      it("should go back to the previous review in the array", async () => {
        reviewStore.setState({ currentReview: mockReviews[1]! });
        renderComponent();
        const user = userEvent.setup();
        await user.click(
          screen.getByRole("button", { name: "Previous review" })
        );
        expect(reviewStore.get("currentReview")).toEqual(mockReviews[0]);
      });

      it("should wrap to the last review when at the first one", async () => {
        renderComponent();
        const user = userEvent.setup();
        await user.click(
          screen.getByRole("button", { name: "Previous review" })
        );
        expect(reviewStore.get("currentReview")).toEqual(
          mockReviews[mockReviews.length - 1]
        );
      });
    });

    describe("surprise me button", () => {
      it("should set currentReview to the review at the random index", async () => {
        jest.spyOn(Math, "random").mockReturnValue(0.5);
        renderComponent();
        const user = userEvent.setup();
        await user.click(
          screen.getByRole("button", {
            name: "Surprise me - show random review",
          })
        );
        const expectedIndex = Math.floor(0.5 * mockReviews.length);
        expect(reviewStore.get("currentReview")).toEqual(
          mockReviews[expectedIndex]
        );
      });
    });
  });

  describe("cleanup", () => {
    it("should remove click listeners from all buttons after cleanup", async () => {
      const mockSetCurrentReview = jest.spyOn(reviewStore, "setCurrentReview");
      const element = renderComponent();
      element.cleanup?.();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Next review" }));
      await user.click(screen.getByRole("button", { name: "Previous review" }));
      await user.click(
        screen.getByRole("button", { name: "Surprise me - show random review" })
      );
      expect(mockSetCurrentReview).not.toHaveBeenCalled();
    });
  });
});
