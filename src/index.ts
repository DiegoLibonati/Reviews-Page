import "@/index.css";
import GlimpsedPage from "@/pages/GlimpsedPage/GlimpsedPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const glimpsedPage = GlimpsedPage();
  app.appendChild(glimpsedPage);
};

document.addEventListener("DOMContentLoaded", onInit);
