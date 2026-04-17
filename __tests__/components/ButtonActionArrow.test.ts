import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonActionArrowProps } from "@/types/props";
import type { ButtonActionArrowComponent } from "@/types/components";

import ButtonActionArrow from "@/components/ButtonActionArrow/ButtonActionArrow";

const mockOnClick = jest.fn();

const defaultProps: ButtonActionArrowProps = {
  id: "arrow-btn",
  ariaLabel: "Navigate",
  children: "<i>arrow</i>",
  className: "arrow-class",
  onClick: mockOnClick,
};

const renderComponent = (
  props: Partial<ButtonActionArrowProps> = {}
): ButtonActionArrowComponent => {
  const element = ButtonActionArrow({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("ButtonActionArrow", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a button element", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render with the correct id", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("id", "arrow-btn");
    });

    it("should render with the correct aria-label", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Navigate" })
      ).toBeInTheDocument();
    });

    it("should include the className in the button classes", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass("arrow-class");
    });

    it("should render with the base tailwind classes", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass(
        "flex",
        "items-center",
        "justify-center",
        "cursor-pointer",
        "text-white"
      );
    });

    it("should render with empty content when children is not provided", () => {
      const element = ButtonActionArrow({
        id: "arrow-btn",
        ariaLabel: "Navigate",
        onClick: mockOnClick,
      });
      document.body.appendChild(element);
      expect(screen.getByRole("button")).toHaveTextContent("");
    });

    it("should render without extra class when className is not provided", () => {
      const element = ButtonActionArrow({
        id: "arrow-btn",
        ariaLabel: "Navigate",
        onClick: mockOnClick,
      });
      document.body.appendChild(element);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call onClick when the button is clicked", async () => {
      renderComponent();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should call onClick each time the button is clicked", async () => {
      renderComponent();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button"));
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(2);
    });
  });

  describe("cleanup", () => {
    it("should remove the click listener after cleanup is called", async () => {
      const element = renderComponent();
      element.cleanup?.();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
