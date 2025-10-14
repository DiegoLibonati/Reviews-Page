import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { ButtonActionArrowProps } from "@src/entities/props";

import { ButtonActionArrow } from "@src/components/ButtonActionArrow/ButtonActionArrow";

type RenderComponent = {
  props: ButtonActionArrowProps;
  container: HTMLButtonElement;
};

const renderComponent = (
  id: string,
  ariaLabel: string,
  children?: string,
  className?: string,
  onClick?: jest.Mock
): RenderComponent => {
  const props: ButtonActionArrowProps = {
    id: id,
    ariaLabel: ariaLabel,
    children: children,
    className: className,
    onClick: onClick ?? jest.fn(),
  };

  const container = ButtonActionArrow({
    id: props.id,
    ariaLabel: props.ariaLabel,
    children: props.children,
    className: props.className,
    onClick: props.onClick,
  });

  document.body.appendChild(container);

  return {
    props: props,
    container: container,
  };
};

describe("ButtonActionArrow.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    const props = {
      id: "arrow-button",
      ariaLabel: "Navigate forward",
      children: "→",
      className: "custom-arrow-class",
    };

    test("It should create a button element with correct attributes", () => {
      const { container } = renderComponent(
        props.id,
        props.ariaLabel,
        props.children,
        props.className
      );

      expect(container).toBeInstanceOf(HTMLButtonElement);
      expect(container.id).toBe(props.id);
      expect(container.getAttribute("aria-label")).toBe(props.ariaLabel);
      expect(container.innerHTML).toBe(props.children);
    });

    test("It should be accessible via screen.getByRole", () => {
      renderComponent(props.id, props.ariaLabel, props.children);

      const button = screen.getByRole("button", { name: props.ariaLabel });

      expect(button).toBeInTheDocument();
      expect(button.innerHTML).toBe(props.children);
    });

    test("It should have correct base styling classes", () => {
      const { container } = renderComponent(
        props.id,
        props.ariaLabel,
        props.children
      );

      expect(container.className).toContain("flex");
      expect(container.className).toContain("items-center");
      expect(container.className).toContain("justify-center");
      expect(container.className).toContain("cursor-pointer");
      expect(container.className).toContain("text-white");
    });

    test("It should append custom className when provided", () => {
      const { container } = renderComponent(
        props.id,
        props.ariaLabel,
        props.children,
        props.className
      );

      expect(container.className).toContain(props.className);
      expect(container.className).toContain("flex");
      expect(container.className).toContain("items-center");
    });

    test("It should work without custom className", () => {
      const { container } = renderComponent(
        props.id,
        props.ariaLabel,
        props.children
      );

      expect(container.className).toBe(
        "flex items-center justify-center cursor-pointer text-white "
      );
    });

    test("It should work without children content", () => {
      const { container } = renderComponent(props.id, props.ariaLabel);

      expect(container.innerHTML).toBe("");
      expect(container).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("Click interactions", () => {
    test("It should call onClick handler when clicked", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "arrow-button",
        "Navigate forward",
        "→",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /navigate forward/i });

      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test("It should call onClick handler multiple times", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "arrow-button",
        "Navigate forward",
        "→",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /navigate forward/i });

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    test("It should pass event object to onClick handler", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "arrow-button",
        "Navigate forward",
        "→",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /navigate forward/i });

      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledWith(expect.any(MouseEvent));
    });
  });

  describe("Content rendering", () => {
    test("It should render arrow text content correctly", () => {
      const { container } = renderComponent(
        "left-arrow",
        "Navigate back",
        "←"
      );

      expect(container.innerHTML).toBe("←");
    });

    test("It should render right arrow text content correctly", () => {
      const { container } = renderComponent(
        "right-arrow",
        "Navigate forward",
        "→"
      );

      expect(container.innerHTML).toBe("→");
    });

    test("It should render SVG arrow content correctly", () => {
      const svgArrow =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>';
      const { container } = renderComponent(
        "svg-arrow",
        "Next",
        svgArrow
      );

      expect(container.querySelector("svg")).toBeInTheDocument();
      expect(container.querySelector("path")).toBeInTheDocument();
    });

    test("It should render icon with text content correctly", () => {
      const iconContent = '<span class="icon">▶</span> Next';
      const { container } = renderComponent(
        "icon-button",
        "Go to next",
        iconContent
      );

      expect(container.innerHTML).toBe(iconContent);
      expect(container.querySelector(".icon")).toBeInTheDocument();
    });
  });

  describe("Flexbox layout verification", () => {
    test("It should center content with flex properties", () => {
      const { container } = renderComponent(
        "centered-arrow",
        "Navigate",
        "→"
      );

      const computedStyle = window.getComputedStyle(container);
      expect(container.className).toContain("flex");
      expect(container.className).toContain("items-center");
      expect(container.className).toContain("justify-center");
    });

    test("It should maintain flex layout with custom classes", () => {
      const { container } = renderComponent(
        "custom-arrow",
        "Navigate",
        "→",
        "bg-blue-500 hover:bg-blue-600"
      );

      expect(container.className).toContain("flex");
      expect(container.className).toContain("items-center");
      expect(container.className).toContain("justify-center");
      expect(container.className).toContain("bg-blue-500");
    });
  });

  describe("Edge cases", () => {
    test("It should handle empty string as children", () => {
      const { container } = renderComponent(
        "empty-arrow",
        "Empty arrow button",
        ""
      );

      expect(container.innerHTML).toBe("");
    });

    test("It should handle empty string as className", () => {
      const { container } = renderComponent(
        "arrow-button",
        "Arrow button",
        "→",
        ""
      );

      expect(container.className).toBe(
        "flex items-center justify-center cursor-pointer text-white "
      );
    });

    test("It should handle multiple custom classes", () => {
      const { container } = renderComponent(
        "multi-class-arrow",
        "Multi class arrow",
        "→",
        "w-10 h-10 rounded-full bg-primary"
      );

      expect(container.className).toContain("w-10");
      expect(container.className).toContain("h-10");
      expect(container.className).toContain("rounded-full");
      expect(container.className).toContain("bg-primary");
    });

    test("It should maintain button functionality with complex arrow content", () => {
      const mockOnClick = jest.fn();
      const complexArrow =
        '<div class="arrow-wrapper"><span class="arrow-icon">→</span></div>';
      renderComponent(
        "complex-arrow",
        "Complex arrow navigation",
        complexArrow,
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", {
        name: /complex arrow navigation/i,
      });

      expect(button.querySelector(".arrow-wrapper")).toBeInTheDocument();
      expect(button.querySelector(".arrow-icon")).toBeInTheDocument();
    });

    test("It should handle unicode arrows correctly", () => {
      const arrows = ["←", "→", "↑", "↓", "⇐", "⇒"];

      arrows.forEach((arrow, index) => {
        const { container } = renderComponent(
          `arrow-${index}`,
          `Navigate ${arrow}`,
          arrow
        );

        expect(container.innerHTML).toBe(arrow);
      });
    });
  });

  describe("Accessibility", () => {
    test("It should have descriptive aria-label for navigation arrows", () => {
      const { container } = renderComponent(
        "prev-button",
        "Go to previous page",
        "←"
      );

      expect(container.getAttribute("aria-label")).toBe("Go to previous page");
    });

    test("It should be keyboard accessible", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "arrow-button",
        "Navigate forward",
        "→",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /navigate forward/i });
      button.focus();

      expect(document.activeElement).toBe(button);
    });
  });
});