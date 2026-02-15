import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonActionProps } from "@/types/props";
import type { ButtonActionComponent } from "@/types/components";

import { ButtonAction } from "@/components/ButtonAction/ButtonAction";

const renderComponent = (props: ButtonActionProps): ButtonActionComponent => {
  const container = ButtonAction(props);
  document.body.appendChild(container);
  return container;
};

describe("ButtonAction Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: ButtonActionProps = {
    id: "test-button",
    ariaLabel: "Test button",
    children: "Click Me",
    onClick: mockOnClick,
  };

  it("should render button with correct attributes", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "test-button");
    expect(button.innerHTML).toBe("Click Me");
  });

  it("should call onClick handler when clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test button" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should apply additional className when provided", () => {
    const propsWithClass: ButtonActionProps = {
      ...defaultProps,
      className: "custom-class",
    };

    renderComponent(propsWithClass);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toHaveClass("custom-class");
  });

  it("should cleanup event listener", async () => {
    const user = userEvent.setup();
    const button = renderComponent(defaultProps);

    button.cleanup?.();

    const buttonElement = screen.getByRole("button", { name: "Test button" });
    await user.click(buttonElement);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
