import { Review } from "@src/models/Review";

import { getElements } from "@src/helpers/getElements";

import { reviews } from "@src/constants/reviewsData";

let currentReview: Review;

const handleNextReview = (): void => {
  const indexOfCurrentReview = handleGetIndexOfReview(currentReview);

  if (indexOfCurrentReview >= reviews.length - 1) {
    return handleChangeReview(reviews[0]);
  }

  return handleChangeReview(reviews[indexOfCurrentReview + 1]);
};

const handlePrevReview = (): void => {
  const indexOfCurrentReview = handleGetIndexOfReview(currentReview);

  if (indexOfCurrentReview <= 0) {
    return handleChangeReview(reviews[reviews.length - 1]);
  }

  return handleChangeReview(reviews[indexOfCurrentReview - 1]);
};

const handleSetRandomReview = (): void => {
  const randomPosition = Math.floor(Math.random() * reviews.length);
  return handleChangeReview(reviews[randomPosition]);
};

const handleSetInitialValues = () => {
  currentReview = reviews[0];

  handleChangeReview(currentReview);
};

const handleChangeReview = (review: Review): void => {
  const { reviewDescription, reviewImage, reviewName, reviewPosition } =
    getElements();

  currentReview = review;
  currentReview.setContent(
    reviewName,
    reviewPosition,
    reviewDescription,
    reviewImage
  );
};

const handleGetIndexOfReview = (review: Review): number => {
  return reviews.indexOf(review);
};

const onInit = () => {
  handleSetInitialValues();

  const { btnNext, btnPrev, btnRandom } = getElements();

  btnNext.addEventListener("click", handleNextReview);

  btnPrev.addEventListener("click", handlePrevReview);

  btnRandom.addEventListener("click", handleSetRandomReview);
};

document.addEventListener("DOMContentLoaded", onInit);
