import { test, expect } from "@playwright/test";
import { getNowInBrussels, getOpenStatus } from "../src/lib/hours";

for (const [time, open, label] of [
  ["08:59", false, "Open om 09:00"],
  ["09:00", true, "Nu open tot 12:00"],
  ["11:59", true, "Nu open tot 12:00"],
  ["12:00", false, "Open om 13:00"],
  ["13:00", true, "Nu open tot 18:00"],
  ["17:59", true, "Nu open tot 18:00"],
  ["18:00", false, "Morgen open om 09:00"],
] as const) {
  test(`Monday ${time}`, () => {
    const now = getNowInBrussels(new Date(`2026-10-05T${time}:00+02:00`));
    expect(getOpenStatus(now)).toEqual({ open, label });
  });
}

test("weekend and holiday boundaries", () => {
  expect(getOpenStatus(getNowInBrussels(new Date("2026-10-10T12:00:00+02:00"))).label).toBe("Maandag open om 09:00");
  expect(getOpenStatus(getNowInBrussels(new Date("2026-10-11T10:00:00+02:00"))).label).toBe("Morgen open om 09:00");
  const holidays = [{ from: "2026-10-05", to: "2026-10-06", label: "Vakantie" }];
  expect(getOpenStatus(getNowInBrussels(new Date("2026-10-05T09:00:00+02:00")), holidays)).toEqual({ open: false, label: "Gesloten · Vakantie" });
  expect(getOpenStatus(getNowInBrussels(new Date("2026-10-06T23:59:00+02:00")), holidays).label).toBe("Gesloten · Vakantie");
  expect(getOpenStatus(getNowInBrussels(new Date("2026-10-04T10:00:00+02:00")), holidays).label).toBe("Woensdag open om 09:00");
});

test("Brussels midnight, winter offset and daylight-saving switches", () => {
  expect(getNowInBrussels(new Date("2026-10-04T22:30:00Z"))).toEqual({ date: "2026-10-05", isoDay: 1, minutes: 30 });
  expect(getNowInBrussels(new Date("2026-01-05T08:00:00Z")).minutes).toBe(540);
  expect(getNowInBrussels(new Date("2026-03-29T01:00:00Z")).minutes).toBe(180);
  expect(getNowInBrussels(new Date("2026-10-25T01:00:00Z")).minutes).toBe(120);
});
