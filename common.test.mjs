import { findingEvent, prepareOccasions } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

// Mock data for testing
const daysData = [
  {
    monthName: "September",
    dayName: "Saturday",
    occurence: "first",
    name: "International Vulture Awareness Day",
    descriptionURL: "https://codeyourfuture.github.io/The-Piscine/days/vultures.txt"
  },
  {
    monthName: "September",
    dayName: "Saturday",
    occurence: "third",
    name: "International Red Panda Day",
    descriptionURL: "https://codeyourfuture.github.io/The-Piscine/days/red-pandas.txt"
  }
];

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const currentMonth = "September";

test("prepareOccasions filters and maps correctly", () => {
  const occasions = prepareOccasions(daysData, weekDays, currentMonth);
  assert.equal(occasions.length, 2);
  assert.equal(occasions[0].occuranceIndex, 1);
  assert.equal(occasions[1].occuranceIndex, 3);
});
// test("Greeting is correct", () => {
//   assert.equal(findingEvent(), "Hello");
// });
