import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { OFFICIAL_BODY, mockReviews } from "@tests/jest.constants";

jest.mock("@src/constants/reviewsData.ts", () => ({
  get reviews() {
    return mockReviews;
  },
}));

describe("index.ts", () => {
  describe("General Tests.", () => {
    const firstReview = mockReviews[0];
    const nextReview = mockReviews[1];

    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the title of the reviews.", () => {
      const titleReviews = screen.getByRole("heading", {
        name: /client reviews/i,
      });

      expect(titleReviews).toBeInTheDocument();
    });

    test("It must render the image, name, position and description of the review.", () => {
      const img = screen.getByRole("img");
      const name = screen.getByRole("heading", { name: firstReview.name });
      const position = screen.getByText(firstReview.position);
      const description = screen.getByText(firstReview.description);

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", firstReview.image);
      expect(name).toBeInTheDocument();
      expect(position).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    test("It should render the next, previous and surprise buttons.", () => {
      const btnPrev = screen.getByRole("button", { name: /btn prev review/i });
      const btnNext = screen.getByRole("button", { name: /btn next review/i });
      const btnRandom = screen.getByRole("button", {
        name: /btn random review/i,
      });

      expect(btnPrev).toBeInTheDocument();
      expect(btnNext).toBeInTheDocument();
      expect(btnRandom).toBeInTheDocument();
    });

    test("It should render the next review when the 'Next' button is tapped.", async () => {
      const img = screen.getByRole("img");
      const name = screen.getByRole("heading", { name: firstReview.name });
      const position = screen.getByText(firstReview.position);
      const description = screen.getByText(firstReview.description);

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", firstReview.image);
      expect(name).toBeInTheDocument();
      expect(position).toBeInTheDocument();
      expect(description).toBeInTheDocument();

      const btnNext = screen.getByRole("button", { name: /btn next review/i });

      expect(btnNext).toBeInTheDocument();

      await user.click(btnNext);

      const imgNext = screen.getByRole("img");
      const nameNext = screen.getByRole("heading", { name: nextReview.name });
      const positionNext = screen.getByText(nextReview.position);
      const descriptionNext = screen.getByText(nextReview.description);

      expect(imgNext).toBeInTheDocument();
      expect(imgNext).toHaveAttribute("src", nextReview.image);
      expect(nameNext).toBeInTheDocument();
      expect(positionNext).toBeInTheDocument();
      expect(descriptionNext).toBeInTheDocument();
    });

    test("It should render the next review when the 'Prev' button is tapped.", async () => {
      const img = screen.getByRole("img");
      const name = screen.getByRole("heading", { name: firstReview.name });
      const position = screen.getByText(firstReview.position);
      const description = screen.getByText(firstReview.description);

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", firstReview.image);
      expect(name).toBeInTheDocument();
      expect(position).toBeInTheDocument();
      expect(description).toBeInTheDocument();

      const btnNext = screen.getByRole("button", { name: /btn next review/i });

      expect(btnNext).toBeInTheDocument();

      await user.click(btnNext);

      const imgNext = screen.getByRole("img");
      const nameNext = screen.getByRole("heading", { name: nextReview.name });
      const positionNext = screen.getByText(nextReview.position);
      const descriptionNext = screen.getByText(nextReview.description);

      expect(imgNext).toBeInTheDocument();
      expect(imgNext).toHaveAttribute("src", nextReview.image);
      expect(nameNext).toBeInTheDocument();
      expect(positionNext).toBeInTheDocument();
      expect(descriptionNext).toBeInTheDocument();

      const btnPrev = screen.getByRole("button", { name: /btn prev review/i });

      expect(btnPrev).toBeInTheDocument();

      await user.click(btnPrev);

      const imgPrev = screen.getByRole("img");
      const namePrev = screen.getByRole("heading", { name: firstReview.name });
      const positionPrev = screen.getByText(firstReview.position);
      const descriptionPrev = screen.getByText(firstReview.description);

      expect(imgPrev).toBeInTheDocument();
      expect(imgPrev).toHaveAttribute("src", firstReview.image);
      expect(namePrev).toBeInTheDocument();
      expect(positionPrev).toBeInTheDocument();
      expect(descriptionPrev).toBeInTheDocument();
    });
  });
});
