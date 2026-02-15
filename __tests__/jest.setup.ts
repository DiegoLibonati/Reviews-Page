import "@testing-library/jest-dom";

import { mockReviews } from "@tests/__mocks__/reviews.mock";

jest.mock("@/constants/reviews", () => ({
  __esModule: true,
  default: mockReviews,
}));
