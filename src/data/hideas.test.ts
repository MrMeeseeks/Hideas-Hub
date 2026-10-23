/// <reference types="bun" />
import { describe, expect, it } from "bun:test";
import { EVENTS, upcomingEvents } from "./hideas";

describe("upcomingEvents", () => {
  it("hides past events and features the Oct 23 DMT activation next", () => {
    const list = upcomingEvents(EVENTS, new Date("2026-10-21T14:39:00Z"));
    expect(list[0]?.id).toBe("dmt-activation-vancouver");
    expect(list.every((e) => e.date >= "2026-10-21")).toBe(true);
  });

  it("uses Vancouver time: event day still counts late evening Pacific", () => {
    // 2026-10-24 04:00 UTC is 2026-10-23 21:00 in Vancouver
    const list = upcomingEvents(EVENTS, new Date("2026-10-24T04:00:00Z"));
    expect(list.map((e) => e.id)).toContain("dmt-activation-vancouver");
  });
});
