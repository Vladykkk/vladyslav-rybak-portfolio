import assert from "node:assert/strict";
import { test } from "node:test";

import { formatMonth, yearsOfExperience } from "./experience.ts";

test("years of experience rounds to the nearest half year, halves up", () => {
  assert.equal(yearsOfExperience("2024-08", new Date(2026, 9)), 2); // Oct 2026, 26 months
  assert.equal(yearsOfExperience("2024-08", new Date(2026, 10)), 2.5); // Nov 2026, 27 months
  assert.equal(yearsOfExperience("2024-08", new Date(2027, 4)), 3); // May 2027, 33 months
});

test("formatMonth", () => assert.equal(formatMonth("2024-08"), "Aug 2024"));
