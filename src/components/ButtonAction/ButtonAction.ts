import type { ButtonActionProps } from "@/types/props";
import type { ButtonActionComponent } from "@/types/components";

export const ButtonAction = ({
  id,
  ariaLabel,
  children,
  className,
  onClick,
}: ButtonActionProps): ButtonActionComponent => {
  const button = document.createElement("button") as ButtonActionComponent;

  button.className = `text-white border-2 rounded-md p-1 ${className ?? ""}`;
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.innerHTML = children ?? "";

  button.addEventListener("click", onClick);

  button.cleanup = (): void => {
    button.removeEventListener("click", onClick);
  };

  return button;
};
