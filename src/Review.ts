export class Review {
  constructor(
    public image: string,
    public name: string,
    public position: string,
    public description: string
  ) {}

  setContent(
    nameElement: HTMLHeadingElement,
    positionElement: HTMLParagraphElement,
    descriptionElement: HTMLParagraphElement,
    imgElement: HTMLImageElement
  ): void {
    nameElement.innerHTML = this.name;
    positionElement.innerHTML = this.position;
    descriptionElement.innerHTML = this.description;
    imgElement.src = `${this.image}`;
  }
}
