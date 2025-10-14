import { ButtonActionProps } from "@src/entities/props";

export const ButtonAction = ({
  id,
  ariaLabel,
  children,
  className,
  onClick,
}: ButtonActionProps): HTMLButtonElement => {
  const button = document.createElement("button");

  button.className = `text-white border-2 rounded-md p-1 ${className ?? ""}`;
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.innerHTML = children ?? "";

  button.addEventListener("click", onClick);

  return button;
};
