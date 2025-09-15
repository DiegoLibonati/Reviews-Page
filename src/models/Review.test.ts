import { Review } from "./Review";

import { getElements } from "@src/helpers/getElements";

import { OFFICIAL_BODY } from "@tests/jest.constants";

describe("Review Class", () => {
  const REVIEW = {
    image: "image",
    name: "name",
    position: "position",
    description: "description",
  };

  let review: Review = new Review(
    REVIEW.image,
    REVIEW.name,
    REVIEW.position,
    REVIEW.description
  );

  beforeEach(() => {
    document.body.innerHTML = OFFICIAL_BODY;
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("It must have the correct initial state when initializing an instance of review.", () => {
    expect(review.image).toBe(REVIEW.image);
    expect(review.name).toBe(REVIEW.name);
    expect(review.position).toBe(REVIEW.position);
    expect(review.description).toBe(REVIEW.description);
  });

  test("It must set the content of the entered elements when the method is executed: 'setContent'.", () => {
    const { reviewImage, reviewName, reviewDescription, reviewPosition } =
      getElements();

    review.setContent(
      reviewName,
      reviewPosition,
      reviewDescription,
      reviewImage
    );

    expect(reviewName).toHaveTextContent(review.name);
    expect(reviewPosition).toHaveTextContent(review.position);
    expect(reviewDescription).toHaveTextContent(review.description);
    expect(reviewImage).toHaveAttribute("src", review.image);
  });
});
