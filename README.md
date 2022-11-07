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

## Description

I made a web page that allows you to see different reviews, this web application allowed me to learn how to make this kind of reviews/slides with next, prev and with a `Surprise Me` button that basically looks for a random review to show. In this case you see an image, the name, the role and a brief description. I use POO to build this.

## Technologies used

1. Javascript (POO)
2. CSS3
3. HTML5

## Galery

![Reviews-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/reviews-0.jpg)

![Reviews-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/reviews-1.jpg)

![Reviews-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/reviews-2.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Reviews%20page`

## Video

https://user-images.githubusercontent.com/99032604/198900258-9df2ce62-3eae-460e-a989-59d825eb5a27.mp4

## Documentation

Here we get all the elements that are going to be updated with dynamic information from the html:

```
const nombrePersona = document.getElementById("nombre");
const cargoPersona = document.getElementById("cargo");
const textoPersona = document.getElementById("texto");
const imagenPersona = document.getElementById("foto");
```

Here we get all the buttons that can be used, i.e. the `next` button to go to the next review, the `prev` button to go to the last review and the `surprise` button to go to a random review:

```
const btnNext = document.getElementById("btnnext");
const btnPrev = document.getElementById("btnprev");
const btnRandom = document.getElementById("btnrandom");
```

Here create the class `Reviews`, this class will have as attributes: image, name, title and text. Also it will have 2 methods which are: `changeP` which will change the image and `insert` which basically will change the name, the position and the text of the review:

```
class Reviews {
  constructor(imagen, nombre, cargo, texto) {
    this.imagen = imagen;
    this.nombre = nombre;
    this.cargo = cargo;
    this.texto = texto;
  }

  changeP() {
    imagenPersona.src = `${this.imagen}`;
  }

  insertar() {
    nombrePersona.innerHTML = this.nombre;
    cargoPersona.innerHTML = this.cargo;
    textoPersona.innerHTML = this.texto;
  }
}
```

An example of how to create an object thanks to the `Reviews` class:

```
const review1 = new Reviews(
  "Image",
  "Name",
  "Rol",
  "Description"
);
```

After having created all the reviews, we add them to an array and then we can manage this array, using the indices:

```
const reviews = [review1, review2, review3];
```

At this moment we configure to show the review with index 0. That is to say, we execute the class methods for the review with index 0 of the `reviews` array:

```
let positionReview = 0;

reviews[positionReview].insertar();
reviews[positionReview].changeP();
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
function pasarRew() {
  if (positionReview >= reviews.length - 1) {
    positionReview = 0;
    reviews[positionReview].insertar();
    reviews[positionReview].changeP();
  } else {
    positionReview += 1;
    reviews[positionReview].insertar();
    reviews[positionReview].changeP();
  }
}

function prevRew() {
  if (positionReview <= 0) {
    positionReview = reviews.length - 1;
    reviews[positionReview].insertar();
    reviews[positionReview].changeP();
  } else {
    positionReview -= 1;
    reviews[positionReview].insertar();
    reviews[positionReview].changeP();
  }
}
```

The `surprise` button basically when clicked, will select an existing index at random and execute the methods with the review found in that index in the `reviews` array:

```
btnRandom.addEventListener("click", () => {
  const randomPosition = Math.floor(Math.random() * reviews.length);
  reviews[randomPosition].insertar();
  reviews[randomPosition].changeP();
});

```
