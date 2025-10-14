import { ReviewPage } from "@src/pages/ReviewPage/ReviewPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const reviewPage = ReviewPage();
  app.appendChild(reviewPage);
};

document.addEventListener("DOMContentLoaded", onInit);
