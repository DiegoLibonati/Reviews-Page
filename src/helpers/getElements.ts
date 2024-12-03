export const getElements = () => ({
  reviewName: document.getElementById("name") as HTMLHeadingElement,
  reviewPosition: document.getElementById("position") as HTMLParagraphElement,
  reviewDescription: document.getElementById(
    "description"
  ) as HTMLParagraphElement,
  reviewImage: document.getElementById("image") as HTMLImageElement,
  btnNext: document.getElementById("btnnext") as HTMLButtonElement,
  btnPrev: document.getElementById("btnprev") as HTMLButtonElement,
  btnRandom: document.getElementById("btnrandom") as HTMLButtonElement,
});
