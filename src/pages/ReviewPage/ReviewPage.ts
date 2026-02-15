import type { Page } from "@/types/pages";

import { Review } from "@/components/Review/Review";

import { reviewStore } from "@/stores/reviewStore";

export const ReviewPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "w-screen h-screen bg-background";

  main.innerHTML = `
    <section class="flex items-center justify-center w-full h-full review-wrapper">
    </section>
  `;

  let currentReviewComponent: ReturnType<typeof Review> | null = null;

  const renderReview = (): void => {
    const { currentReview } = reviewStore.getState();

    const reviewWrapper = main.querySelector<HTMLElement>(".review-wrapper");

    if (currentReviewComponent) {
      currentReviewComponent.cleanup?.();
    }

    reviewWrapper?.replaceChildren();

    const review = Review({
      imgSrc: currentReview.imgSrc,
      description: currentReview.description,
      name: currentReview.name,
      position: currentReview.position,
    });

    currentReviewComponent = review;

    reviewWrapper?.append(review);
  };

  renderReview();

  const unsubscribe = reviewStore.subscribe("currentReview", renderReview);

  main.cleanup = (): void => {
    unsubscribe();

    if (currentReviewComponent) {
      currentReviewComponent.cleanup?.();
      currentReviewComponent = null;
    }
  };

  return main;
};
