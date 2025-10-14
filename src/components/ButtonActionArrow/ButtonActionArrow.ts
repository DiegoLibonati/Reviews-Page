import { ButtonActionArrowProps } from "@src/entities/props";

export const ButtonActionArrow = ({
  id,
  ariaLabel,
  children,
  className,
  onClick,
}: ButtonActionArrowProps): HTMLButtonElement => {
  const button = document.createElement("button");

  button.className = `flex items-center justify-center cursor-pointer text-white ${
    className ?? ""
  }`;
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.innerHTML = children ?? "";

  button.addEventListener("click", onClick);

  return button;
};
