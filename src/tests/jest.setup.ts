import "@testing-library/jest-dom";

import fs from "fs";
import path from "path";

import { REVIEWS_MOCK } from "./constants/constants";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../../index.html"),
  "utf8"
);

export const OFFICIAL_BODY = INITIAL_HTML.match(
  /<body[^>]*>([\s\S]*?)<\/body>/i
)![1];

jest.mock("../constants/reviewsData.ts", () => ({
  get reviews() {
    return REVIEWS_MOCK;
  },
}));
