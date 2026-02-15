import "@/index.css";
import { ReviewPage } from "@/pages/ReviewPage/ReviewPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const reviewPage = ReviewPage();
  app.appendChild(reviewPage);
};

document.addEventListener("DOMContentLoaded", onInit);
