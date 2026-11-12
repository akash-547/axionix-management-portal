import assert from "node:assert/strict";
import test from "node:test";
import { calculateProjectShares } from "./agency.js";

test("calculates shares for a PKR 100,000 project", () => {
  assert.deepEqual(calculateProjectShares(100_000), {
    companyShare: 30_000,
    bdShare: 5_000,
    profileOwnerShare: 5_000,
    executionPool: 60_000,
  });
});
