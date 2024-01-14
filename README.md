# Reviews-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a web page that allows you to see different reviews, this web application allowed me to learn how to make this kind of reviews/slides with next, prev and with a `Surprise Me` button that basically looks for a random review to show. In this case you see an image, the name, the role and a brief description. I use POO to build this.

## Technologies used

1. Typescript (POO)
2. CSS3
3. HTML5

## Video

https://user-images.githubusercontent.com/99032604/198900258-9df2ce62-3eae-460e-a989-59d825eb5a27.mp4

## Documentation

Here we get all the elements that are going to be updated with dynamic information from the html:

```
const reviewName = document.getElementById("name") as HTMLHeadingElement;
const reviewPosition = document.getElementById(
  "position"
) as HTMLParagraphElement;
const reviewDescriptino = document.getElementById(
  "description"
) as HTMLParagraphElement;
const reviewImage = document.getElementById("image") as HTMLImageElement;
```

Here we get all the buttons that can be used, i.e. the `next` button to go to the next review, the `prev` button to go to the last review and the `surprise` button to go to a random review:

```
const btnNext = document.getElementById("btnnext") as HTMLButtonElement;
const btnPrev = document.getElementById("btnprev") as HTMLButtonElement;
const btnRandom = document.getElementById("btnrandom") as HTMLButtonElement;
```

This class `Reviews` receives as attributes an array of reviews and an index to know in which review it is currently. It also has different methods such as add all reviews, add a review, go to the next review, go to the previous review and select a random review:

```
import { Review } from "./Review";

export class Reviews {
  constructor(public reviews: Review[], public indexReview: number) {}

  addReview(review: Review): void {
    this.reviews.push(review);
    return;
  }

  addReviews(reviews: Review[]): void {
    this.reviews = reviews;
    return;
  }

  nextReview(): void {
    if (this.indexReview >= this.reviews.length - 1) {
      this.indexReview = 0;
      return;
    }
    this.indexReview += 1;
    return;
  }

  prevReview(): void {
    if (this.indexReview <= 0) {
      this.indexReview = this.reviews.length - 1;
      return;
    }
    this.indexReview -= 1;
    return;
  }

  setRandomIndex(): void {
    const randomPosition = Math.floor(Math.random() * this.reviews.length);
    this.indexReview = randomPosition;
    return;
  }
}
```

An example of how to create an object thanks to the `Review` class:

```
const review1 = new Review(
  "Image",
  "Name",
  "Rol",
  "Description"
);
```

After having created all the reviews, we add them to an array and then we can manage this array, using the indices:

```
reviews.addReviews([review1, review2, review3]);
```

At this moment we configure to show the review with index 0. That is to say, we execute the class methods for the review with index 0 of the `reviews` array:

```
reviews.reviews[reviews.indexReview].setContent(
  reviewName,
  reviewPosition,
  reviewDescriptino,
  reviewImage
);
```

The `next` button and the `prev` button will be assigned an event which is when they are clicked and each will execute a different function:

```
btnNext.addEventListener("click", () => {
  pasarRew();
});

btnPrev.addEventListener("click", () => {
  prevRew();
});
```

These are the functions that will be executed depending on whether `next` or `prev` is played. In both cases it is set first if the index exists, if it exists it will subtract or add to the global index and/or if it does not exist it sets a default value:

```
const nextReview = (): void => {
  reviews.nextReview();
  reviews.reviews[reviews.indexReview].setContent(
    reviewName,
    reviewPosition,
    reviewDescriptino,
    reviewImage
  );
  return;
};

const prevReview = (): void => {
  reviews.prevReview();
  reviews.reviews[reviews.indexReview].setContent(
    reviewName,
    reviewPosition,
    reviewDescriptino,
    reviewImage
  );
  return;
};
```

The `surprise` button basically when clicked, will select an existing index at random and execute the methods with the review found in that index in the `reviews` array:

```
btnRandom.addEventListener("click", () => {
  reviews.setRandomIndex();
  reviews.reviews[reviews.indexReview].setContent(
    reviewName,
    reviewPosition,
    reviewDescriptino,
    reviewImage
  );
});
```
