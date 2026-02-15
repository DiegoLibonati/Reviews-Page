import type { ButtonActionArrowProps } from "@/types/props";
import type { ButtonActionArrowComponent } from "@/types/components";

export const ButtonActionArrow = ({
  id,
  ariaLabel,
  children,
  className,
  onClick,
}: ButtonActionArrowProps): ButtonActionArrowComponent => {
  const button = document.createElement("button") as ButtonActionArrowComponent;

  button.className = `flex items-center justify-center cursor-pointer text-white ${
    className ?? ""
  }`;
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.innerHTML = children ?? "";

  button.addEventListener("click", onClick);

  button.cleanup = (): void => {
    button.removeEventListener("click", onClick);
  };

  return button;
};
