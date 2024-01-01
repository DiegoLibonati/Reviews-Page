const nombrePersona = document.getElementById("nombre") as HTMLHeadingElement;
const cargoPersona = document.getElementById("cargo") as HTMLParagraphElement;
const textoPersona = document.getElementById("texto") as HTMLParagraphElement;
const imagenPersona = document.getElementById("foto") as HTMLImageElement;

const btnNext = document.getElementById("btnnext") as HTMLButtonElement;
const btnPrev = document.getElementById("btnprev") as HTMLButtonElement;
const btnRandom = document.getElementById("btnrandom") as HTMLButtonElement;

class Reviews {
  constructor(
    public imagen: string,
    public nombre: string,
    public cargo: string,
    public texto: string
  ) {}

  changeP(): void {
    imagenPersona.src = `${this.imagen}`;
  }

  insertar(): void {
    nombrePersona.innerHTML = this.nombre;
    cargoPersona.innerHTML = this.cargo;
    textoPersona.innerHTML = this.texto;
  }
}

const review1 = new Reviews(
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "Susan Smith",
  "WEB DEVELOPER",
  "Tilde twee ahep cornhole activ marfa before they sold out XOXO poutine craft beer scenester cronut drinking vinegar knausgaard you probably haven't heard of them hella. Literally selvage mumblecore activated charcoal echo park vegan deep v fingerstache irony kogi microdosing trust fund. Schlitz cloud bread activated charcoal, master cleanse kitsch shoreditch umami bicycle rights la croix post-ironic biodiesel edison bul."
);
const review2 = new Reviews(
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3f01db52-f675-48dc-9c91-f245d99f1486/d2nqynw-af694fd2-e1ba-4e9c-badb-630a48474599.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNmMDFkYjUyLWY2NzUtNDhkYy05YzkxLWYyNDVkOTlmMTQ4NlwvZDJucXludy1hZjY5NGZkMi1lMWJhLTRlOWMtYmFkYi02MzBhNDg0NzQ1OTkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.59_LN0TnrsDrVLS266jLpfZZfte_OZeNGkNQFJzgQCM",
  "Carlo Calvin",
  "BACKEND DEVELOPER",
  "Yr offal cornhole neutra. Cronut kale chips hoodie, mustache tilde tacos palo santo fashion axe whatever pop-up post-ironic pitchfork pok pok ethical. Literally freegan post-ironic wolf listicle synth gochujang tousled palo santo 3 wolf moon health goth next level. Asymmetrical you probably haven't heard of them lomo post-ironic, pitchfork crucifix narwhal retro chia tofu schlitz. Kitsch keytar normcore listicle flexitarian fashion axe chartreuse jianbing yr vice flannel cred."
);
const review3 = new Reviews(
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "Martinez Riq",
  "BACKEND DEVELOPER",
  "Air plant deep v polaroid church-key. Farm-to-table ramps put a bird on it pickled aesthetic pork belly beard tbh street art pabst. Pop-up cliche before they sold out hoodie heirloom flannel schlitz organic. Crucifix forage cardigan before they sold out umami echo park subway tile art party squid shoreditch photo booth."
);

const reviews = [review1, review2, review3];

let positionReview: number = 0;

reviews[positionReview].insertar();
reviews[positionReview].changeP();

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

btnNext.addEventListener("click", () => {
  pasarRew();
});

btnPrev.addEventListener("click", () => {
  prevRew();
});

btnRandom.addEventListener("click", () => {
  const randomPosition = Math.floor(Math.random() * reviews.length);
  reviews[randomPosition].insertar();
  reviews[randomPosition].changeP();
});
