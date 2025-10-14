import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { mockReviews } from "@tests/jest.constants";

import { ReviewProps } from "@src/entities/props";

import { Review } from "@src/components/Review/Review";

import { reviewStore } from "@src/stores/reviewStore";

type RenderComponent = {
  props: ReviewProps;
  container: HTMLDivElement;
};

const renderComponent = (
  imgSrc: string,
  name: string,
  description: string,
  position: string
): RenderComponent => {
  const props: ReviewProps = {
    imgSrc,
    name,
    description,
    position,
  };

  const container = Review({
    imgSrc: props.imgSrc,
    name: props.name,
    description: props.description,
    position: props.position,
  });

  document.body.appendChild(container);

  return {
    props: props,
    container: container,
  };
};

describe("Review.ts", () => {
  beforeEach(() => {
    reviewStore.setReviews(mockReviews);
    reviewStore.setCurrentReview(mockReviews[0]);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    const props = {
      imgSrc: "https://example.com/person.jpg",
      name: "John Doe",
      description: "Great service and excellent quality.",
      position: "CEO at TechCorp",
    };

    test("It should create a div element with correct structure", () => {
      const { container } = renderComponent(
        props.imgSrc,
        props.name,
        props.description,
        props.position
      );

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.classList.contains("review")).toBe(true);
    });

    test("It should have correct base styling classes", () => {
      const { container } = renderComponent(
        props.imgSrc,
        props.name,
        props.description,
        props.position
      );

      expect(container.className).toContain("flex");
      expect(container.className).toContain("flex-col");
      expect(container.className).toContain("bg-primary");
      expect(container.className).toContain("p-6");
    });

    test("It should render all required elements", () => {
      const { container } = renderComponent(
        props.imgSrc,
        props.name,
        props.description,
        props.position
      );

      const image = container.querySelector<HTMLImageElement>("#image");
      const nameElement = container.querySelector<HTMLHeadingElement>("#name");
      const positionElement =
        container.querySelector<HTMLParagraphElement>("#position");
      const descriptionElement =
        container.querySelector<HTMLParagraphElement>("#description");

      expect(image).toBeInTheDocument();
      expect(nameElement).toBeInTheDocument();
      expect(positionElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();
    });
  });

  describe("Content rendering", () => {
    test("It should display correct image source", () => {
      const imgSrc = "https://example.com/test-image.jpg";
      const { container } = renderComponent(
        imgSrc,
        "Test Name",
        "Test Description",
        "Test Position"
      );

      const image = container.querySelector<HTMLImageElement>("#image");
      expect(image?.src).toBe(imgSrc);
      expect(image?.alt).toBe("review");
    });

    test("It should display correct name", () => {
      const name = "Alice Johnson";
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        name,
        "Description",
        "Position"
      );

      const nameElement = container.querySelector<HTMLHeadingElement>("#name");
      expect(nameElement?.textContent).toBe(name);
    });

    test("It should display correct position", () => {
      const position = "Senior Developer";
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        position
      );

      const positionElement =
        container.querySelector<HTMLParagraphElement>("#position");
      expect(positionElement?.textContent).toBe(position);
    });

    test("It should display correct description", () => {
      const description = "This is a detailed review description.";
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        description,
        "Position"
      );

      const descriptionElement =
        container.querySelector<HTMLParagraphElement>("#description");
      expect(descriptionElement?.textContent).toBe(description);
    });

    test("It should render Client Reviews heading", () => {
      renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        "Position"
      );

      const heading = screen.getByText("Client Reviews");
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H2");
    });
  });

  describe("Action buttons", () => {
    test("It should render all action buttons", () => {
      renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        "Position"
      );

      const prevButton = screen.getByRole("button", {
        name: /btn prev review/i,
      });
      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      const randomButton = screen.getByRole("button", {
        name: /btn random review/i,
      });

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
      expect(randomButton).toBeInTheDocument();
    });

    test("It should render buttons with correct ids", () => {
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        "Position"
      );

      const prevButton = container.querySelector("#btnprev");
      const nextButton = container.querySelector("#btnnext");
      const randomButton = container.querySelector("#btnrandom");

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
      expect(randomButton).toBeInTheDocument();
    });

    test("It should render Surprise Me button with correct text", () => {
      renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        "Position"
      );

      const randomButton = screen.getByRole("button", {
        name: /btn random review/i,
      });
      expect(randomButton.innerHTML).toBe("Surprise Me");
    });

    test("It should render navigation buttons with icons", () => {
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        "Position"
      );

      const prevButton = container.querySelector("#btnprev");
      const nextButton = container.querySelector("#btnnext");

      expect(prevButton?.querySelector(".material-icons")).toBeInTheDocument();
      expect(nextButton?.querySelector(".material-icons")).toBeInTheDocument();
    });
  });

  describe("Navigation functionality", () => {
    test("It should navigate to next review when next button is clicked", async () => {
      renderComponent(
        mockReviews[0].imgSrc,
        mockReviews[0].name,
        mockReviews[0].description,
        mockReviews[0].position
      );

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      await user.click(nextButton);

      const state = reviewStore.getState();
      expect(state.currentReview).toEqual(mockReviews[1]);
    });

    test("It should navigate to previous review when prev button is clicked", async () => {
      reviewStore.setCurrentReview(mockReviews[1]);

      renderComponent(
        mockReviews[1].imgSrc,
        mockReviews[1].name,
        mockReviews[1].description,
        mockReviews[1].position
      );

      const prevButton = screen.getByRole("button", {
        name: /btn prev review/i,
      });
      await user.click(prevButton);

      const state = reviewStore.getState();
      expect(state.currentReview).toEqual(mockReviews[0]);
    });

    test("It should loop to first review when next is clicked on last review", async () => {
      reviewStore.setCurrentReview(mockReviews[2]);

      renderComponent(
        mockReviews[2].imgSrc,
        mockReviews[2].name,
        mockReviews[2].description,
        mockReviews[2].position
      );

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      await user.click(nextButton);

      const state = reviewStore.getState();
      expect(state.currentReview).toEqual(mockReviews[0]);
    });

    test("It should loop to last review when prev is clicked on first review", async () => {
      reviewStore.setCurrentReview(mockReviews[0]);

      renderComponent(
        mockReviews[0].imgSrc,
        mockReviews[0].name,
        mockReviews[0].description,
        mockReviews[0].position
      );

      const prevButton = screen.getByRole("button", {
        name: /btn prev review/i,
      });
      await user.click(prevButton);

      const state = reviewStore.getState();
      expect(state.currentReview).toEqual(mockReviews[2]);
    });

    test("It should set random review when Surprise Me button is clicked", async () => {
      const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);

      renderComponent(
        mockReviews[0].imgSrc,
        mockReviews[0].name,
        mockReviews[0].description,
        mockReviews[0].position
      );

      const randomButton = screen.getByRole("button", {
        name: /btn random review/i,
      });
      await user.click(randomButton);

      const state = reviewStore.getState();
      expect(state.currentReview).toBeDefined();
      expect(mockReviews).toContainEqual(state.currentReview);

      mathRandomSpy.mockRestore();
    });
  });

  describe("Multiple navigation interactions", () => {
    test("It should handle multiple next button clicks", async () => {
      renderComponent(
        mockReviews[0].imgSrc,
        mockReviews[0].name,
        mockReviews[0].description,
        mockReviews[0].position
      );

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });

      await user.click(nextButton);
      expect(reviewStore.getState().currentReview).toEqual(mockReviews[1]);

      await user.click(nextButton);
      expect(reviewStore.getState().currentReview).toEqual(mockReviews[2]);

      await user.click(nextButton);
      expect(reviewStore.getState().currentReview).toEqual(mockReviews[0]);
    });

    test("It should handle multiple prev button clicks", async () => {
      reviewStore.setCurrentReview(mockReviews[2]);

      renderComponent(
        mockReviews[2].imgSrc,
        mockReviews[2].name,
        mockReviews[2].description,
        mockReviews[2].position
      );

      const prevButton = screen.getByRole("button", {
        name: /btn prev review/i,
      });

      await user.click(prevButton);
      expect(reviewStore.getState().currentReview).toEqual(mockReviews[1]);

      await user.click(prevButton);
      expect(reviewStore.getState().currentReview).toEqual(mockReviews[0]);

      await user.click(prevButton);
      expect(reviewStore.getState().currentReview).toEqual(mockReviews[2]);
    });

    test("It should handle mixed navigation clicks", async () => {
      renderComponent(
        mockReviews[0].imgSrc,
        mockReviews[0].name,
        mockReviews[0].description,
        mockReviews[0].position
      );

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      const prevButton = screen.getByRole("button", {
        name: /btn prev review/i,
      });

      await user.click(nextButton);
      expect(reviewStore.getState().currentReview).toEqual(mockReviews[1]);

      await user.click(nextButton);
      expect(reviewStore.getState().currentReview).toEqual(mockReviews[2]);

      await user.click(prevButton);
      expect(reviewStore.getState().currentReview).toEqual(mockReviews[1]);
    });
  });

  describe("Layout structure", () => {
    test("It should have review actions container", () => {
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        "Position"
      );

      const reviewActions = container.querySelector(".review__actions");
      expect(reviewActions).toBeInTheDocument();
    });

    test("It should have review actions arrows container", () => {
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        "Position"
      );

      const reviewActionArrows = container.querySelector(
        ".review__actions-arrows"
      );
      expect(reviewActionArrows).toBeInTheDocument();
    });

    test("It should have arrow buttons inside arrows container", () => {
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        "Position"
      );

      const reviewActionArrows = container.querySelector(
        ".review__actions-arrows"
      );
      const prevButton = reviewActionArrows?.querySelector("#btnprev");
      const nextButton = reviewActionArrows?.querySelector("#btnnext");

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    test("It should have Surprise Me button inside actions container", () => {
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        "Position"
      );

      const reviewActions = container.querySelector(".review__actions");
      const randomButton = reviewActions?.querySelector("#btnrandom");

      expect(randomButton).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    test("It should handle empty description", () => {
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "",
        "Position"
      );

      const descriptionElement =
        container.querySelector<HTMLParagraphElement>("#description");
      expect(descriptionElement?.textContent).toBe("");
    });

    test("It should handle long description", () => {
      const longDescription = "Lorem ipsum dolor sit amet, ".repeat(20);
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        longDescription,
        "Position"
      );

      const descriptionElement =
        container.querySelector<HTMLParagraphElement>("#description");
      expect(descriptionElement?.textContent).toBe(longDescription);
    });

    test("It should handle special characters in name", () => {
      const specialName = "John O'Reilly-Smith";
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        specialName,
        "Description",
        "Position"
      );

      const nameElement = container.querySelector<HTMLHeadingElement>("#name");
      expect(nameElement?.textContent).toBe(specialName);
    });

    test("It should work with single review in store", async () => {
      const singleReview = [mockReviews[0]];
      reviewStore.setReviews(singleReview);
      reviewStore.setCurrentReview(singleReview[0]);

      renderComponent(
        singleReview[0].imgSrc,
        singleReview[0].name,
        singleReview[0].description,
        singleReview[0].position
      );

      const nextButton = screen.getByRole("button", {
        name: /btn next review/i,
      });
      await user.click(nextButton);

      expect(reviewStore.getState().currentReview).toEqual(singleReview[0]);
    });
  });

  describe("Responsive classes", () => {
    test("It should have responsive flex direction classes", () => {
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        "Position"
      );

      expect(container.className).toContain("flex-col");
      expect(container.className).toContain("md:flex-row");
    });

    test("It should have responsive height classes", () => {
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        "Position"
      );

      expect(container.className).toContain("h-[95%]");
      expect(container.className).toContain("md:h-[50%]");
      expect(container.className).toContain("lg:h-[65%]");
    });

    test("It should have responsive width classes", () => {
      const { container } = renderComponent(
        "https://example.com/person.jpg",
        "Name",
        "Description",
        "Position"
      );

      expect(container.className).toContain("w-full");
      expect(container.className).toContain("md:w-[95%]");
      expect(container.className).toContain("lg:w-[85%]");
      expect(container.className).toContain("xl:w-[70%]");
      expect(container.className).toContain("2xl:w-[65%]");
    });
  });
});
