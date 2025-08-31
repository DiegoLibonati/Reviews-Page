import { getElements } from "./getElements";

import { OFFICIAL_BODY } from "../../tests/jest.constants";

describe("getElements.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the elements of the document that the 'getElements' function exports.", () => {
      const {
        btnNext,
        btnPrev,
        btnRandom,
        reviewDescription,
        reviewImage,
        reviewName,
        reviewPosition,
      } = getElements();

      expect(btnNext).toBeInTheDocument();
      expect(btnPrev).toBeInTheDocument();
      expect(btnRandom).toBeInTheDocument();
      expect(reviewDescription).toBeInTheDocument();
      expect(reviewImage).toBeInTheDocument();
      expect(reviewName).toBeInTheDocument();
      expect(reviewPosition).toBeInTheDocument();
    });
  });
});
