import type { ReviewProps } from "@/types/props";
import type { ReviewComponent } from "@/types/components";

import { ButtonAction } from "@/components/ButtonAction/ButtonAction";
import { ButtonActionArrow } from "@/components/ButtonActionArrow/ButtonActionArrow";

import { reviewStore } from "@/stores/reviewStore";

const handleNextReview = (): void => {
  const { reviews, currentReview } = reviewStore.getState();

  const indexOfCurrentReview = reviews.indexOf(currentReview);

  if (indexOfCurrentReview >= reviews.length - 1) {
    reviewStore.setCurrentReview(reviews[0]!);
    return;
  }

  reviewStore.setCurrentReview(reviews[indexOfCurrentReview + 1]!);
};

const handlePrevReview = (): void => {
  const { reviews, currentReview } = reviewStore.getState();

  const indexOfCurrentReview = reviews.indexOf(currentReview);

  if (indexOfCurrentReview <= 0) {
    reviewStore.setCurrentReview(reviews[reviews.length - 1]!);
    return;
  }

  reviewStore.setCurrentReview(reviews[indexOfCurrentReview - 1]!);
};

const handleSetRandomReview = (): void => {
  const { reviews } = reviewStore.getState();

  const randomPosition = Math.floor(Math.random() * reviews.length);

  reviewStore.setCurrentReview(reviews[randomPosition]!);
};

export const Review = ({
  imgSrc,
  name,
  description,
  position,
}: ReviewProps): ReviewComponent => {
  const divRoot = document.createElement("div") as ReviewComponent;
  divRoot.className =
    "flex flex-col w-full items-center h-[95%] bg-primary p-6 shadow-sm md:flex-row md:h-[50%] md:w-[95%] md:p-8 lg:h-[65%] lg:w-[85%] xl:w-[70%] 2xl:w-[65%] review";

  divRoot.innerHTML = `
    <div class="flex items-center justify-center w-full relative md:w-[60%]">
        <div class="relative flex items-center justify-center flex-col p-4 h-auto w-full max-w-[21.875rem] shadow-md bg-white z-[2]">
            <img
                src="${imgSrc}"
                class="w-full h-64 shadow-sm object-cover mb-2"
                id="image"
                alt="review"
            />
            <h2 class="text-base font-bold uppercase mb-2" id="name">${name}</h2>
            <p
                id="position"
                class="text-xs mb-2 review__position"
            >${position}</p>
        </div>

        <div class="absolute bg-secondary w-40 rounded-lg h-[24rem] z-[1] -top-4"></div>
    </div>

  <div class="flex flex-col mt-6 h-full justify-between md:w-[40%] md:m-0 md:h-[55%] xl:h-[65%] 2xl:h-[50%]">
    <div class="flex flex-col mb-2">
      <h2
        class="text-white text-lg font-bold md:text-2xl lg:text-3xl xl:text-4xl"
      >
        Client Reviews
      </h2>
      <p
        id="description"
        class="text-xs text-white text-justify xl:text-sm review__description"
      >${description}</p>
    </div>

    <div class="flex flex-row w-full justify-around review__actions">
      <div class="flex flex-row review__actions-arrows">
  
      </div>
    </div>

  </div>
  `;

  const reviewActions =
    divRoot.querySelector<HTMLDivElement>(".review__actions");
  const reviewActionArrows = divRoot.querySelector<HTMLDivElement>(
    ".review__actions-arrows"
  );

  const buttonArrowPrev = ButtonActionArrow({
    id: "btnprev",
    ariaLabel: "btn prev review",
    onClick: handlePrevReview,
    children: `<i class="material-icons text-3xl">chevron_left</i>`,
  });

  const buttonArrowNext = ButtonActionArrow({
    id: "btnnext",
    ariaLabel: "btn next review",
    onClick: handleNextReview,
    children: `<i class="material-icons text-3xl">chevron_right</i>`,
  });

  const buttonSurpriseMe = ButtonAction({
    id: "btnrandom",
    ariaLabel: "btn random review",
    children: "Surprise Me",
    onClick: handleSetRandomReview,
  });

  reviewActions?.append(buttonSurpriseMe);
  reviewActionArrows?.append(buttonArrowPrev, buttonArrowNext);

  divRoot.cleanup = (): void => {
    buttonArrowPrev.cleanup?.();
    buttonArrowNext.cleanup?.();
    buttonSurpriseMe.cleanup?.();
  };

  return divRoot;
};
