import { describe, it, expect } from "vitest";
import { cn } from "@/utils/cn";
import { toSlug, isValidSlug } from "@/utils/slug";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("deduplicates Tailwind classes", () => {
    expect(cn("p-4", "p-6")).toBe("p-6");
  });
});

describe("slug utilities", () => {
  it("converts title to slug", () => {
    expect(toSlug("ReactJS Hooks Masterclass")).toBe("reactjs-hooks-masterclass");
  });

  it("strips special characters", () => {
    expect(toSlug("Next.js 14 — App Router!")).toBe("nextjs-14-app-router");
  });

  it("validates correct slugs", () => {
    expect(isValidSlug("reactjs-hooks")).toBe(true);
    expect(isValidSlug("react123")).toBe(true);
  });

  it("rejects invalid slugs", () => {
    expect(isValidSlug("React Hooks")).toBe(false);
    expect(isValidSlug("UPPERCASE")).toBe(false);
    expect(isValidSlug("-leading-dash")).toBe(false);
  });
});
