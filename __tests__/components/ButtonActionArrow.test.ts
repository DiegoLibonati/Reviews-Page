import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonActionArrowProps } from "@/types/props";
import type { ButtonActionArrowComponent } from "@/types/components";

import { ButtonActionArrow } from "@/components/ButtonActionArrow/ButtonActionArrow";

const renderComponent = (
  props: ButtonActionArrowProps
): ButtonActionArrowComponent => {
  const container = ButtonActionArrow(props);
  document.body.appendChild(container);
  return container;
};

describe("ButtonActionArrow Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: ButtonActionArrowProps = {
    id: "test-arrow",
    ariaLabel: "Test arrow button",
    children: '<i class="material-icons">chevron_left</i>',
    onClick: mockOnClick,
  };

  it("should render button with correct attributes", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test arrow button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "test-arrow");
  });

  it("should render icon children", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test arrow button" });
    expect(button.innerHTML).toContain("chevron_left");
  });

  it("should call onClick handler when clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test arrow button" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should apply additional className when provided", () => {
    const propsWithClass: ButtonActionArrowProps = {
      ...defaultProps,
      className: "arrow-custom",
    };

    renderComponent(propsWithClass);

    const button = screen.getByRole("button", { name: "Test arrow button" });
    expect(button).toHaveClass("arrow-custom");
  });

  it("should cleanup event listener", async () => {
    const user = userEvent.setup();
    const button = renderComponent(defaultProps);

    button.cleanup?.();

    const buttonElement = screen.getByRole("button", {
      name: "Test arrow button",
    });
    await user.click(buttonElement);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
