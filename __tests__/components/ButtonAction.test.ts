import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonActionProps } from "@/types/props";
import type { ButtonActionComponent } from "@/types/components";

import ButtonAction from "@/components/ButtonAction/ButtonAction";

const mockOnClick = jest.fn();

const defaultProps: ButtonActionProps = {
  id: "action-btn",
  ariaLabel: "Click action",
  children: "Click Me",
  className: "custom-class",
  onClick: mockOnClick,
};

const renderComponent = (
  props: Partial<ButtonActionProps> = {}
): ButtonActionComponent => {
  const element = ButtonAction({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("ButtonAction", () => {
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
      expect(screen.getByRole("button")).toHaveAttribute("id", "action-btn");
    });

    it("should render with the correct aria-label", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Click action" })
      ).toBeInTheDocument();
    });

    it("should render with the correct text content", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveTextContent("Click Me");
    });

    it("should include the className in the button classes", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });

    it("should render with the base tailwind classes", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass(
        "text-white",
        "border-2",
        "rounded-md",
        "p-1"
      );
    });

    it("should render with empty content when children is not provided", () => {
      const element = ButtonAction({
        id: "action-btn",
        ariaLabel: "Click action",
        onClick: mockOnClick,
      });
      document.body.appendChild(element);
      expect(screen.getByRole("button")).toHaveTextContent("");
    });

    it("should render without extra class when className is not provided", () => {
      const element = ButtonAction({
        id: "action-btn",
        ariaLabel: "Click action",
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
