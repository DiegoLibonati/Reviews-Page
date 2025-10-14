import { Review } from "@src/components/Review/Review";

import { reviewStore } from "@src/stores/reviewStore";

export const ReviewPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "w-screen h-screen bg-background";

  main.innerHTML = `
    <section class="flex items-center justify-center w-full h-full review-wrapper">
    </section>
  `;

  const renderReview = () => {
    const { currentReview } = reviewStore.getState();

    const reviewWrapper = main.querySelector<HTMLElement>(".review-wrapper");
    reviewWrapper?.replaceChildren();

    const review = Review({
      imgSrc: currentReview.imgSrc,
      description: currentReview.description,
      name: currentReview.name,
      position: currentReview.position,
    });

    reviewWrapper?.append(review);
  };

  renderReview();

  reviewStore.subscribe("currentReview", renderReview);

  return main;
};
